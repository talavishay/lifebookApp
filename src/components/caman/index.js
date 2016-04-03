var _m = require('./model');

module.exports = {
	model : new _m,
	initialize :function(){
		App._.extend(this, Backbone.Events);

		this.listenTo(App.fabricToolsChannel, {
			"caman:doit" : (data)=>{
				if(  this._cache( data.src , data ) ){

					this.model.save({
						"actions"	:	this._parseActions(data),
						"src" 	: 	data.src
					});

				}
			},
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
		Caman( App.$('<canvas id="_caman"/>')[0], objectUrl, this._doit);

	},
	_doit : function(){
		var actions = App._caman.model.get("actions");
		App._.each(actions, function(item){
			for(var key in item){
				var key = key,
					val = item[key];

				this[key](parseInt(val));
			}
		}, this);
		this.render(App._caman._done);
	},
	_done : function() {
		var url = URL.createObjectURL(App.dataURItoBlob(this.toBase64()))
		App.fabricToolsChannel.trigger("caman:done", url);
		App.caman.model.set("result", url);
		App.Backbone.Radio.trigger('fabricTools', "caman:status", "end");
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





