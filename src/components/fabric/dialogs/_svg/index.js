'use strict';

var view = require('./view'),
	_model =  require("./model.js");
	
	

var _view = view.extend({
	model : new _model
});

module.exports = _view;
