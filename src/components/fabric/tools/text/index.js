'use strict';
var Model = require('./state.js'),
	view = require('./view.js');

module.exports = view.extend({
	model : new Model
});

