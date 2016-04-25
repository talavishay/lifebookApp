var imageCollection = {
	model: require("./model.js"),
	initialize : function(){
		this.listenTo(App.fabricFilesChannel, "file:image:input:file", this.addFile);
		this.listenTo(App.fabricFilesChannel, "file:image:input:modle", this.addModle);
		App._.bindAll(this, "createSuccess");
	},
	addFile : function (file){
		this.create({
			name		: file.name,
			objectUrl	: URL.createObjectURL(file)
		},{
			success	: this.createSuccess
		});
	},
	addModel : function (model){
		this.create(model,{
			success	: this.createSuccess
		});
	},
	createSuccess 	: function(model){
		model.attach(file, file.name, file.type, this.attachSuccessCallback);
	}, 
	attachSuccessCallback	 : function(err, status){
		App.fabricFilesChannel.trigger("file:image:input:attached", status);	
		//TODO: listenTo file:image:input:attached ...
		if(err)  console.log(err);//TODO: 		err ? console.log(err:;
	},
	sync: App.BackbonePouch.sync({
		db: new App.PouchDB('imagedialogModel'),
		fetch: 'query',
		options: {
			query: {
				include_docs: true,
				fun: {
					map: function(doc) {
						emit(doc.order, null);
					}
				},
				//~ limit : 5
			},
			changes: {
				include_docs: true,
				filter: function(doc) {
				  return doc._deleted ;
				}
			}
		}
    }),
	parse: function(result) {
		return _.pluck(result.rows, 'doc');
	},
};
module.exports = App.Backbone.Collection.extend(imageCollection);
