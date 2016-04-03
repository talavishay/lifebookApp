var Marionette = require('backbone.marionette');
	
var view = Marionette.ItemView.extend({
	template : require('./template.html'),
	events : {
		"click .photo" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'dialog:image');
			//~ App.fabricToolsChannel.trigger("add:image");
		},	
		"click .shape" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'dialog:svg');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .text" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'add:text', 'click to edit');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
	}
});

module.exports =  view;
