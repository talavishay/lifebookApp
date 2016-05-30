var Backbone = App.Backbone,
	PageableCollection = require("backbone.paginator");
module.exports =  PageableCollection.extend({
		url : function(){
			return App.svg.collectionUrl;
		},
		mode : 'client',
		state: {
            pageSize: 9
        },
		model : require('./fileModel'),
		parse : function(response){
			App.fabricToolsChannel.trigger("dialog:svg:dirs", response.dirs);
			return response.files;
		}
});
