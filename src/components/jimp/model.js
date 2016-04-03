'use strict';
var Backbone = require('backbone'),
	BackbonePouch = require("backbone-pouch");
	
	App.BackbonePouch = BackbonePouch;

Backbone.Model.prototype.idAttribute = '_id';

var model = Backbone.Model.extend({
	sync: BackbonePouch.sync({
		db: window.PouchDB('imagedialogModel')
	}),
	parse : function(response, options){
		var doc = response.doc ? _.pluck(response, 'doc') : response,
			model = this,
			callback = function(error, blob){
				if(!error){	
					model.set({
						"objectUrl" : URL.createObjectURL(blob)
					});
					model.save();
				}
			};
			
			App.$.ajax({
				async:false,
				url: doc.objectUrl,
			})
			.fail(function(){
				if(doc._attachments){
					//~ must have an DB id  in order to attach to it
					model.set(doc);
					
					model.attachment(doc.name, callback );
				}
			})
			return doc;
		
	},
	events : {
		"change" : (ev) => console.log
	},
	defaults : {
		"objectUrl" : "objectUrl" ,
		"name" : "name"
	},
	refreshObjectUrl : function(blob){	
				this.set({objectUrl : URL.createObjectURL(blob)});
				this.save();
	},
	validateObjectUrl : function(objectUrl){
		//~ var v =  
			
		//~ console.log(v);
		return App.$
			.get(objectUrl)			;
	},
	initialize : function(){
		var model = this;
	
	},
}).extend(BackbonePouch.attachments());

module.exports = model;
