'use strict';
var Backbone = require('backbone');

var model = Backbone.Model.extend({
		//~ url : '/src/svg',
		defaults : {
			"svgs" : [""]
		},	
});

module.exports = model;
