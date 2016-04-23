'use strict';
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
		defaults : {
			width	:  595,
			height	:  842,
			//~ width	:  2480,
			//~ height	:  3508,
			//2480 x 3508 -- A4 x 300DPI
		}
});
