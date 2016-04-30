var	PageableCollection = require("backbone.paginator");
//~ var cacheControl = new App.Backbone.Hoard.Control();
//~ module.exports =  PageableCollection.extend({
module.exports =  App.Backbone.Collection.extend({
		url : function(){
			return App.mask.collectionUrl;
		},
		initialize : function(){
			this.fetch();
		},
		mode : 'client',
		model : require('./fileModel'),
		parse : function(response){
			App.fabricToolsChannel.trigger("dialog:mask:dirs", response.dirs);
			return App._.map(response.files, function(file){
				file.mask = file.src;
				return file;
			});
		}
});
