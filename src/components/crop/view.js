var	_m = require('./model');

module.exports = App.Marionette.ItemView.extend({
	className 	: "crop",
	template	: require('./template.html'),
	behaviors	: [
		{ behaviorClass: require('./DropFiles')},
	],
	model 		: new _m(),
	initialize 	:	function(options){
		App._.bindAll(this, '_jCropOnSelect');
		this.model.set({
			org : options.src,
			croped : "#"
		});
	},
	onAttach:function(options){
		 this._jCropInit();
	},
	modelEvents : {
		'change:croped' : 'preview',
		//~ 'change:coord' : 'crop'
	},
	ui :{
		"save" :".save",
		"preview" : ".preview"
	},
	events : {
		"click @ui.save" : "triggerAddImage",
		"click @ui.preview" : "crop"
	},
	 triggerAddImage : function(){
		App.fabricToolsChannel.trigger("image:add", this.model.get("croped"));
	 },
	_jCropInit : function(){
		var width = this.$el.width(),
			view = this,
			//~ width =250,
			height = 300;
			options = {
				boxWidth: width,
				boxHeight: height,
				setSelect:   [ width/10, height/4, width*.8, height/2 ],
				onSelect: this._jCropOnSelect
			};

		this.$el.find("img.org").Jcrop(options, ()=>{
				view.jcrop_api=this;
		});
	},
	_jCropOnSelect : function(coord){
		this.model.set("coord", coord);
	},
	preview : function(e){
			this.$el.find("img.croped").attr("src", this.model.get("croped"));
	},
	crop : function(){
		var view = this,
			c = this.model.get("coord"),
			srcImage = this.model.get("org"),
			_canvas = App.$('<canvas id="_caman"/>');
		Caman( _canvas[0], srcImage, function () {
			this.crop(c.w,c.h,c.x,c.y);
			this.render(function(rendered){
				var url = URL.createObjectURL(App.dataURItoBlob(this.toBase64()));
				view.model.set("croped", url);
			});
		});
	},
});
