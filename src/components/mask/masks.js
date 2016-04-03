var	PageableCollection = require("backbone.paginator");
//~ var cacheControl = new App.Backbone.Hoard.Control();
//~ module.exports =  PageableCollection.extend({
module.exports =  App.Backbone.Collection.extend({
		url : function(){
			return App.mask.collectionUrl;
		},

		//~ sync: cacheControl.getModelSync(),
		mode : 'client',
		//~ state: {
            //~ pageSize: 9
        //~ },
		model : require('./fileModel'),
		parse : function(response){
			App.fabricToolsChannel.trigger("dialog:mask:dirs", response.dirs);
			this.currentImgPreviewThumb
			return response.files;
		}
});
