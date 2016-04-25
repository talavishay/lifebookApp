'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
		parse : function(response){
			return { name : response } ;
		},
		defaults : {
			"type" : "dir",
			"name" : "#"
		},
		
});
