var	_colorPicker = require('../colorPicker'),
view = {
	className 	: "backgroundEdit crop",
	template	: require('./crop.html'),
	regions : {
		colorPicker : ".colorPicker"
	},
	behaviors	: [
		{ behaviorClass: require('./DropFiles')},
	],
	model		: App.crop.model,
	initialize 	:	function(options){
		App.crop.model._setup(options.src);
	},
	onAttach:function(options){
		this.colorPicker.show(new _colorPicker(this.options));
		this._jCropInit();
	},
	events : {
		"click .save" : "_triggerSetBackground",
		"input .opacity" : function(ev){
			App.fabricToolsChannel.trigger("set:backgroundOpacity", ev.currentTarget.value);
		}
	},
	_triggerSetBackground : function(){
		App.files.add(App.crop.file);
		App.fabricToolsChannel.trigger("add:background", App.crop.model.get("croped"));
	},
	_jCropInit : function(){
		var width = this.$el.width(),
			view = this,
			height = 300;
			options = {
				boxWidth: width, 
				boxHeight: height, 
				setSelect:   [ 50,50,100,100 ],
				onSelect	: App.crop.init
			};
		this.$el.find("img.org").Jcrop(options);
	},
};
module.exports =  App.Marionette.LayoutView.extend(view);
