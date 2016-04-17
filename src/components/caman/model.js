'use strict';
module.exports = App.Backbone.Model.extend({
	localStorage: new App.Backbone.LocalStorage("caman"), // Unique name within
	defaults	: {
		_id : "process",
	},
});
