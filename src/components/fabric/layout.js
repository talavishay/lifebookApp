var Tools = require("./tools"),
	view = require('./view.js'),
	_state = require('./state.js');

module.exports = App.Marionette.LayoutView.extend({
	template :  require('./layout.html'),
	regions : {
		stage : '#stage',
		tools : '#tools',
	},
	model : new _state,
	modelEvents : {
		"change:scale" : "zoomAction"
	},
	events : {
		"keyup #fabric" : "test"
	},
	initialize : function(){
		App._.bindAll(this,  "_scrolldAction");
		App.$("#fonInit").hide(1000);
		this.listenTo(App.fabricToolsChannel, {
			"zoom:in" : this.zoomIn,
			"zoom:out" : this.zoomOut
		}, this);
	},
	onShow : function(ev){
		this.stage.show(new view);
		this.tools.show(new Tools);
		
		this.$el.mousewheel( this._scrolldAction);
	},
	onAttach :function(){
		var that = this;
//TODO: load jQuery.event.drag proprely..
		jQuery(document).ready(function(){
			jQuery(that.el)
			.drop("end",function(ev,dd){
				var src = App.files.getSrcId(dd.drag.dataset.id);
				if(src){
					App.fabricToolsChannel.trigger("image:add" , src);
				};
			});
		});
	},
	_scrolldAction : function(ev){
		if(App.textEditor){		return;	};
		if(ev.deltaY & !ev.shiftKey){
			var _c = (ev.altKey) ? "left" : "top",
				_step = this.model.get(_c)  - ev.deltaY*30;

			this.model.set(_c, _step);
			App.$("#stage > div ").css(	_c , _step);
		};
		if(ev.deltaX && ev.shiftKey){
			var dir = (ev.deltaX < 0) ? "zoom:in" : "zoom:out";
			App.fabricToolsChannel.trigger(dir, .1 );
		};
	},
	zoomAction : function(){
		var _s = this.model.get("scale");
		App.$("#stage > div ").css("transform",'scale('+_s+')');
		App.log("current Zoom: " + _s.toFixed(2));
	},
	zoomIn : function(factor){
		var _s = factor + this.model.get("scale");
		this.model.set("scale",_s);
		},
	zoomOut : function(factor){
		var _s = this.model.get("scale") - factor ;
		this.model.set("scale",_s);
	},
	_handleDrop : function (files) {
		var file = URL.createObjectURL(files[0]);
		App.fabricToolsChannel.trigger("add:image", file);
		App.fabricFilesChannel.trigger("add:file", files[0]);
	}
});
