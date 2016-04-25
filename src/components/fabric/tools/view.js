var text = require("./text"),
	shape = require("./shape"),
	group = require("./group"),
	image = require("./image");

module.exports = App.Marionette.LayoutView.extend({
	className : 'fabricTools',
	template: require('./template.html') ,
	regions : {
		tools : "#main",
		dialog : "#dialog"
	},
	initialize : function(){
		this.listenTo(App.fabricToolsChannel, {
			"tools:show" : this.show,
			"tools:destroy" : this.destroy
		}, this);
	},
	destroy : function(){
		if(this.tools.currentView){
			this.tools.currentView.destroy();
		};
	},
	show : function(){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		switch(obj.type){

			case "i-text":
			case "textbox":
				var type = text;
			break;

			case "image":
			case "cropzoomimage":
			case "clipedImage":
				var type = image;
			break;

			case "path-group":
			case "rect":
			case "triangle":
			case "circle":
				var type = shape;
			break;

			case "group":
				var type = group;
			break;
		};
		this.tools.show(new type(obj));
	},
});

//~ this.listenTo(fabricToolsChannel, "dialog:hide", function(){
	//~ this.dialog.$el.find(".dialogs").hide();
//~ });
//~ var absCoords = obj.canvas.getAbsoluteCoords(obj),
					//~ _scale = App.layout.fabric.currentView.model.get("scale");

				//~ var _top = top > (window.innerHeight - 70) ? window.innerHeight - this.$el.height() - 70 : top;

				//~ this.$el.css({
						//~ left : (absCoords.right * _scale )- this.$el.width() ,
						//~ top : (absCoords.bottom) *_scale,
						//~ visibility: 'visible',
						//~ position : 'absolute'
				//~ });		}
