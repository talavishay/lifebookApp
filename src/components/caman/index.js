var _m = require('./model');

module.exports = {
	model : new _m,
	initialize :function(){
		App._.extend(this, Backbone.Events);
		//TODO: cleanup
		this.listenTo(App.fabricToolsChannel, {
			"caman:doit" : (data)=>{
				App.nprogress.start();
				if(  this._cache( data.src , data ) ){

					this.model.save(App._.extend({
						"actions"	:	this._parseActions(data),
						"src" 		:	data.src,
						"tintcolor" : 	data.tintcolor
					}, App.resolver.extractUrl(data.src)));
				};
			},
			"caman:status" : (status)=>{
				status === "done"	? App.nprogress.done(): null;
				status === "start"	? App.nprogress.inc():null
				console.log(status);
			}
		}, this);
		this.listenTo(this.model, {
			"change:actions" :this._init
		}, this);
		return this;
	},
	_init : function(){

		App.Backbone.Radio.trigger('fabricTools', "caman:status", "start");
		var objectUrl = this.model.get("src");

		//~ App.caman._currentActions =  this.model.get("actions");
		var c = Caman( App.$('<canvas id="_caman"/>')[0], objectUrl, this._doit);
// Listen to a single instance only

		Caman.Event.listen(c, "processComplete", function (job, x) {
		  console.log("Finished:", job);
		  //~ console.log(this);
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
		//TODO: dataURItoBlob ??  why not use blob-util ?
		var blob = App.dataURItoBlob(this.toBase64()),
			//~ name = App._.last(this.image.currentSrc.split('/')),
			mime = App.files.get(App.caman.model.get("id")).get("filemime"),
			name = App.files.get(App.caman.model.get("id")).get("filename"),
			_file= new File(
				[blob], 
				name, 
				{type:  mime });
		//~ var file = App.files.create(_file,{parse : true});
		var src = App.files.create(_file,{parse : true}).refreshSrc();
		//~ var src = file.refreshSrc();
		App.fabricToolsChannel.trigger("caman:done", src);
		App.caman.model.set("result", src);
		
		
		App.Backbone.Radio.trigger('fabricTools', "caman:status", "done");
		
	},
	_parseActions	: function(data){
		var actions = [];
		App._.each(data, function(i,k){
			if(i!=="0" && !isNaN(parseInt(i))){
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
	//~ };
		console.log( this.cacheHash, this.currentHash );

		return this.cacheHash != this.currentHash ;
	}
};






