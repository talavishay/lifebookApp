var Dialogs = require("./dialogs"),
	Tools = require("./tools"),
	view = require('./view.js'),
	_state = require('./state.js');

module.exports = App.Marionette.LayoutView.extend({
	template :  require('./layout.html'),
	regions : {
		stage : '#stage',
		tools : '#tools',
		dialogs : "#dialogs"
	},
	model : new _state,
	modelEvents : {
		"change:scale" : "zoomAction"
	},
	events : {
		"keyup #fabric" : "test"
	},
	initialize : function(){
		_.bindAll(this, '_scrolldAction');
		App.$("#fonInit").hide(1000);

		this.listenTo(App.fabricToolsChannel, {
			"zoom:in" : this.zoomIn,
			"zoom:out" : this.zoomOut
		}, this);
	},
	onShow : function(ev){
		this.dialogs.show(new Dialogs);
		this.stage.show(new view);
		this.tools.show(new Tools);
	},
	onAttach :function(){
		this.$el.mousewheel( this._scrolldAction);
		App.dragDrop(this.el, this._handleDrop);
	},
	_scrolldAction : function(ev){
		if(ev.deltaY & !ev.shiftKey){
			var _c = (ev.altKey) ? "left" : "top",
				_step = this.model.get(_c)  + ev.deltaY*30;

			this.model.save(_c, _step);
			App.$("#stage > div ").css(	_c , _step);
		}
		if(ev.deltaX && ev.shiftKey){
			var dir = (ev.deltaX < 0) ? "zoom:in" : "zoom:out";
			App.fabricToolsChannel.trigger(dir, .1 );
		}
	},
	zoomAction : function(){
		var _s = this.model.get("scale");
		App.$("#stage > div ").css("transform",'scale('+_s+')');
		App.log("current Zoom: " + _s.toFixed(2));
	},
	zoomIn : function(factor){
		var _s = factor + this.model.get("scale");
		this.model.save("scale",_s);
		},
	zoomOut : function(factor){
		var _s = this.model.get("scale") - factor ;
		this.model.save("scale",_s);
	},
	_handleDrop : function (files) {
		var file = URL.createObjectURL(files[0]);
		App.fabricToolsChannel.trigger("add:image", file);
		App.fabricFilesChannel.trigger("add:file", files[0]);
	}
});
