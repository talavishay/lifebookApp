var	Marionette = App.Marionette,
	_colorPicker = require('../colorPicker'),
	_m = require('./model');

var view = Marionette.LayoutView.extend({
	className 	: "backgroundEdit crop",
	template	: require('./crop.html'),
//##START
	regions : {
	//		crop: ".crop",
			colorPicker : ".colorPicker"
	},
	onShow : function(ev){
//		this.crop.show(new _crop(this.options));		
		this.colorPicker.show(new _colorPicker(this.options));		
	},
//##END
	behaviors	: [
		{ behaviorClass: require('./DropFiles')},
		//~ { behaviorClass: require('../behaviors/gradSelector')},
	],
	model 		: new _m(),
	initialize 	:	function(options){
		App._.bindAll(this, '_jCropOnSelect');
		this.model.set("org", options.src);
		//~ this.model.save("croped", "#");
	},
	onAttach:function(options){
		 this._jCropInit();
	},
	modelEvents : {
		'change:croped' : '_triggerSetBackground',
	},
	events : {
		"click .save" : "crop",
		"input .opacity" : (ev)=>{
			App.fabricToolsChannel.trigger("set:backgroundOpacity", ev.currentTarget.value);
		}
	},
	_triggerSetBackground : function(){
			App.fabricToolsChannel.trigger("add:background", this.model.get("croped"));
	},
	_jCropInit : function(){
		var width = this.$el.width(),
			view = this,
			//~ width =250,
			height = 300;
			options = {
				boxWidth: width, 
				boxHeight: height, 
				setSelect:   [ 50,50,100,100 ],
				onSelect: this._jCropOnSelect
			};
				
		this.$el.find("img.org").Jcrop(options, ()=>{
				view.jcrop_api=this;
		});
	},
	_jCropOnSelect : function(coord){
		this.model.save("coord", coord);
	},
	//~ preview : function(e){		
		//~ this.$el.find("img.croped").attr("src", this.model.get("croped"));
	//~ },
	crop : function(c){
		var view = this,
			c = this.model.get("coord"),
			srcImage = this.model.get("org"),
			_canvas = App.$('<canvas id="_caman"/>');
		Caman( _canvas[0], srcImage, function () {
			this.crop(c.w,c.h,c.x,c.y);
			this.render(function(){
				var url = URL.createObjectURL(App.dataURItoBlob(this.toBase64()))
				
				view.model.set("croped", url);
			});				
		});	
	},
});

module.exports = view;
