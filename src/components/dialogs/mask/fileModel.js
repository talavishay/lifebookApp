'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	parse : function(response){
		var filename = response,
			url = this.url()+"/"+filename.trim();

		return {
			name 		: filename,
			path 		: url,
		};	
	},
	defaults : {
		type : "file",
		name : "#",
		path : "#",
		maskObjectUrl: "",
		imageUrl 	: "",
		maskedImage :""
	},	
});
