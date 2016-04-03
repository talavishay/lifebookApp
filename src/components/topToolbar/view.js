var Marionette = require('backbone.marionette');
	
var view = Marionette.ItemView.extend({
	template : require('./template.html'),
	events : {
		"click .fullscreen": "fullscreen"
	},
	fullscreen : function(){
		if (App.screenfull.enabled) {
			App.screenfull.request();
		} else {
		// Ignore or do something else 
		}
	}
});

module.exports =  view;
