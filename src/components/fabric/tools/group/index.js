'use strict';
var Model = require('./state.js'),
	view = require('./view');

module.exports = view.extend({
	model : new Model
});
