'use strict';
module.exports = App.Backbone.Model.extend({
	defaults : {
		types : ["design", "layout"],
		pageType : ["cover", "group", "student", "greetings"]
	},
});
