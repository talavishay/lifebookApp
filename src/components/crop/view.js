var	_m = require('./model');

module.exports = App.Marionette.ItemView.extend({
	className 	: "crop",
	template	: require('./template.html'),
	model : new _m,
	initialize 	:	function(options){
		App._.bindAll(this, '_jCropOnSelect');
		this.model._setup();
		App.crop = {
			model : this.model
		}
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
		"click @ui.preview" : "crop",
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
				//TODO: this init coords should be coming from the model defaults 
				setSelect:   [ width/10, height/4, width*.8, height/2 ],
				onSelect: this._jCropOnSelect
			};

		this.$el.find("img.org").Jcrop(options, function(){
				view.jcrop_api=this;
		});
	},
	_jCropOnSelect : function(coord){
		
		App.nprogress.set(0.4);
		this.model.set("coord", coord);
		App.nprogress.inc();
		this.crop();
	},
	preview : function(e){
			this.$el.find("img.croped").attr("src", this.model.get("croped"));
	},
	crop : function(){
		var view = this,
			c = this.model.get("coord"),
			srcImage = this.model.get("src"),
			_canvas = App.$('<canvas id="_caman"/>');
		Caman( _canvas[0], srcImage, function () {
			App.nprogress.inc();
			this.crop(c.w,c.h,c.x,c.y);
			App.nprogress.inc();
			this.render(view._done);
			//~ this.render(function(rendered){
				//~ App.nprogress.inc();
				//~ var url = URL.createObjectURL(App.dataURItoBlob(this.toBase64()));
				//~ view.model.set("croped", url);
				//~ App.nprogress.done();
			//~ });
		});
	},
	_done : function() {
		var view = this;
		App.nprogress.inc();
		App.blobUtil.dataURLToBlob(this.toBase64())
			.then(function(blob){
				var model	= App.crop.model,
					mime	= model.get("file").get("filemime"),
					name	= model.get("file").get("filename"),
					_file	= new File([blob], name, {type:  mime });
					
					var file = new App.models.files.draft(_file, {
						parse : true
					});
					model.set("croped", file.refreshSrc());
					App.nprogress.done();
					App.files.add(file);
			});
	},
	
});
