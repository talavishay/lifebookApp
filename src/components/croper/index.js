var	_m = require('./model');
module.exports = function(){
return  {
	model : new _m,
	init : function(coord){
		App.nprogress.set(0.4);
		App.crop.model.set("coord", coord);
		App.nprogress.inc();
		App.crop.crop();
	},
	crop : function(){
		var c = this.model.get("coord"),
			srcImage = this.model.get("src"),
			_canvas = App.$('<canvas id="_caman"/>');
		Caman( _canvas[0], srcImage, function () {
			App.nprogress.inc();
			this.crop(c.w,c.h,c.x,c.y);
			App.nprogress.inc();
			this.render(App.crop.done);
		});
	},
	done : function() {
		App.nprogress.inc();
		App.blobUtil.dataURLToBlob(this.toBase64())
			.then(function(blob){
			var orgFile	= App.crop.model.get("file"),
				mime	= orgFile ? orgFile.get("filemime") : "image/png",
				name	= orgFile ? orgFile.get("filename") : "croped",
				_file	= new File([blob], name, {type:  mime });
				
				App.crop.file = new App.models.files.draft(_file, {
						parse : true
					});
				App.crop.model.set({
					"croped" : App.crop.file.refreshSrc()
				});
				App.nprogress.done();
				//~ App.crop.file = file
				
			});
	}
};
};
