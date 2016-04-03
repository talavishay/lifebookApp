'use strict';
var Marionette = require('backbone.marionette'),
	fabric = App.fabric,
	_extend =require('./object.js');



var view = Marionette.ItemView.extend({
	tagName : "img",
	template: false,
	attributes: function () {
		return this.model.attributes;
	},
	modelEvents: {
		"change:src": "showPreview",
	},
	events : {
		"click" : '_click'
	},

	showPreview 		: function(ev){
		this.$el.attr("src", this.model.get("src"));
		//~ this.generatePreview();
	},
	initialize : function(){
		App._.extend( this , _extend);


		this.listenTo(App.fabricToolsChannel,{
			"_updateMask" : this.showPreview
		}, this);

	},
	//~ onAttach: function(){
		//~ var active = App.fabricToolsChannel.request('getActiveObject'),
			//~ model= this.model;

		//~ if(active){
			//~ imageUrl= 	active.getSrc();
			//~ if(imageUrl){
					//~ this.listenToOnce(model, "change:src", this.showPreview);
					//~ App.fabricToolsChannel
						//~ .request("worker:img:mask", imageUrl, model.get("src"))
						//~ .then(function(result) {
								//~ model.set("src", result);
						//~ });
				//~ }
		//~ }
	//~ }

});


module.exports =  view;
