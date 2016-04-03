'use strict';
var Marionette = require('backbone.marionette'),
	fabric = App.fabric;
	
var view = Marionette.ItemView.extend({
	className : "item loader",
	template: require('./template.html'),
	initialize : function(){
		this.setMaskedImage();
	},
	modelEvents: {
		"change": "_render",
	},
	events : {
		"click" : '_click'
	},
	_click: function(){
		App.fabricToolsChannel.trigger("object:clip", this.model.get("path"), .9,.9);
	},
	_render: function(){
		this.render();
		this.$el.removeClass('loader');
	},
	setMaskedImage : function(){
		var imageUrl = App.fabricToolsChannel.request('getActiveObject').getSrc();
		var maskUrl = 	this.model.get("path"),
		_maskedImage = App.fabricFilesChannel.request("worker:mask:img", imageUrl, maskUrl),
			model = this.model;
			view = this;
		(function(){
		_maskedImage.then(function(result) {
			model.set("maskedImage", result);
			view.render();
		});
		})(model, view, _maskedImage);
	},
});

module.exports =  view;
