'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	parse : function(response){
		var filename = response,
			url = this.url()+"/"+filename.trim();

		return {
			src 		: url,
		};	
	},
	defaults : {
		src :""
	},	
});
