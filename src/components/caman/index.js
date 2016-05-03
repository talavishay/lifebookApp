var _m = require('./model');

module.exports = {
	model : new _m,
	initialize :function(){
		App._.extend(this, Backbone.Events);
		this.listenTo(App.fabricToolsChannel, {
			"caman:doit" : (data)=>{
				if(  this._cache( data.src , data ) ){
					App.nprogress.start();
					var actions = App._.pick(data, "saturation", "sharpen", "brightness", "contrast", "hue", "colorize");

					this.model.set({
						"actions"	:	this._parseActions(actions),
						"src" 		:	data.file.refreshSrc(),
						"tintcolor" : 	data.tintcolor
					});
				};
			},
		}, this);
		this.listenTo(this.model, {
			"change:actions" :this._init
		}, this);
		return this;
	},
	_init : function(){
		this.camanInstance = Caman( App.$('<canvas id="_caman"/>')[0],
												this.model.get("src"), 
												this._doit);
		Caman.Event.listen(this.camanInstance, "processComplete", function (job, x) {
		  //~ console.log("Finished:", job);
		  	App.nprogress.inc();
		});
	},
	_doit : function(){
		App._.each(App.caman.model.get("actions"), function(item){
			for(var key in item){
				var key = key,
					val = item[key];

				App.nprogress.inc();
				if(key !== "colorize"){
					this[key](parseInt(val));
				} else {
					var color = App.caman.model.get("tintcolor");
					this[key](color, parseInt(val));
				};
				App.nprogress.inc();
			}
		}, this);
		this.render(App.caman._done);
	},
	_done : function() {
		App.nprogress.inc();
		App.blobUtil.dataURLToBlob(this.toBase64())
			.then(function(blob){
				var mime	= App.caman.model.get("filemime"),
					name	= App.caman.model.get("filename"),
					_file	= new File([blob], name, {type:  mime });
					
					var file = new App.models.files.draft(_file, {
						parse : true
					});
					App.fabricToolsChannel.trigger("caman:done", 	file.refreshSrc());
					App.nprogress.done();
					App.files.add(file);
					
			});
	},
	
	_parseActions	: function(data){
		var actions = [];
		App._.each(data, function(i,k){
			if(i!=="0" && i!== 0 && !isNaN(parseInt(i))){
				var o = {}
				o[k] = i;
				actions.push(o);
			};
		});
		return actions;
	},
	_cache  : function( data ){
		var cache	= this.model.get("cache" );

		this.currentHash = App.objectHash(  data  );
		this.cacheHash = typeof cache === "undefined" ?
			App.objectHash( Date.now() )	:
			App.objectHash( cache );

		App.caman.model.set("cache", this.currentHash  );
		return this.cacheHash != this.currentHash ;
	}
};
