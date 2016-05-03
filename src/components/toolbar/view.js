var Marionette = require('backbone.marionette');
	
var view = Marionette.ItemView.extend({
	template : require('./template.html'),
	events : {
		"click .photo" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'dialog:fileBrowser');
			//~ App.fabricToolsChannel.trigger("add:image");
		},	
		"click .shape" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'dialog:svg');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .text" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'add:text', 'לחץ להוספת טקסט');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .copy.object" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'clipboard:copy');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .paste.object" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'clipboard:paste');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .copy.page" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'clipboard:page:copy');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .cut.page" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'clipboard:page:cut');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .paste.page" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'clipboard:page:paste');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .undo" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'fabricHistory:undo');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
		"click .redo" : () => {
			App.Backbone.Radio.trigger('fabricTools', 'fabricHistory:redo');
			//~ App.fabricToolsChannel.trigger("add:text");
		},	
	}
});

module.exports =  view;
