'use strict';
var Marionette = require('backbone.marionette'),
	fabric = App.fabric;
	
var view = Marionette.ItemView.extend({
	className : "item ",
	template: require('./template.html'),
	events : {
		"click" : '_click'
	},
	_click: function(){
		App.fabricToolsChannel.trigger("add:image", this.model.get("svg"));
	},

});

module.exports =  view;
