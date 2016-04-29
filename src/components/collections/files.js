module.exports = function(App){
var files = {
	model: require("../models/file/draft.js")(App),
	initialize : function(){
		this.listenTo(App.fabricFilesChannel, {
			"files:input:draft" : this.addDraft,
			"files:input:local" : this.addLocal,
			"files:input:remote" : this.addDrupal,
		}, this);
		App.fabricToolsChannel.reply({
			"files:output" : this.getSrcId
		}, this);
		App._.bindAll(this, "addLocal", "addDraft");
	},
	getById : function (id){
		return this.get(id) ;
	},
	resolveByFid : function(fid){
		return new Promise(function(resolve, reject){
			var z = new App.D8models.file({fid : fid}); 
			z.on("change:_file", function(D8file){
					resolve(z.get("_file"));
			});
			z.on("error", function(err){
					reject(err);
			});
		});
	},
	validateSrc : function (src){
		//TODO: why not use blob-util/imgSrcToBlob  ??
		return new Promise(function(resolve, reject){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src);
			xhr.responseType = 'blob';
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
				  return;
				}
				if(xhr.status === 200){
					resolve(src);
				} else {
					reject(src);
				};
			};
			xhr.send();
		});
	},
	getSrcId : function (id){
		return this.get(id).refreshSrc();
	},
	addDrupal : function (D8model){
		this.add(D8model.get("_file"), {parse: false});
	},
	addDraft : function (file){
		this.add(file, {parse: true});
	},
	addLocal : function (file){
		this.create(file, {
			parse: true,
			success : function(file){
				file.save("state", "local");
			}
		});
	},
	parse : function(result){
		if(result.rows){  
			return result.rows ;
		} else {
			return result ;
		};
	},
	sync: App.BackbonePouch.sync({
		db: App.PouchDB('files'),
		fetch: 'query',
		options: {
			query: {
				include_docs: true,
				attachments : true,
				binary : true,
				fun: {
					map: function(doc) {
						emit(doc);
					}
				}
			}
		}
	}),
};
return App.Backbone.Collection.extend(files);
};
