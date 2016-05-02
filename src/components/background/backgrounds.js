var PageableCollection = require("backbone.paginator");	

module.exports =  PageableCollection.extend({
		url : '/lifebook/backgrounds',
		mode : 'client',
		state: {
            pageSize: 9 
        },
		model : require('./fileModel'),
		//~ parse : function(response){
			//~ return  App._.pluck(response, "field_background_images");
		//~ },
});
