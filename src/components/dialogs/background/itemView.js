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
		App.fabricToolsChannel.trigger("add:background", this.model.get("src"));
	},

});

module.exports =  view;
