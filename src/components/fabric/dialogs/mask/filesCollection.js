var Backbone = require('backbone'),
	_ = require('underscore'),
	dir = require('./dirModel'),
	file = require('./fileModel');

var PageableCollection = require("backbone.paginator");	

//~ module.exports =  Backbone.Collection.extend({
module.exports =  PageableCollection.extend({
		url : '/src/svg/svg',
		mode : 'client',
		state: {
            pageSize: 10 
        },
        
		model:file,
		//~ model: function(item, options) {
			//~ var fileExtension = item.split('.')[1];
			//~ if(fileExtension === "svg"){
				//~ if(fileExtension === "svg"){
					//~ return new file(item, options);
				//~ }
			//~ } else {
			  //~ return new dir(item, options);
			//~ }
		//~ },
		parse : function(response){
			return  _.filter(response, function(val){ 
				return val.split('.')[1] === "svg" }
			);
		}
});
