var Backbone = require("backbone"),
	//~ BackbonePouch = require("backbone-pouch"),
	//~ PouchDB = require('pouchdb'),
	//~ PouchBase = require('backbone-pouch-collection'),
	//~ Radio = require('backbone.radio'),
	//~ fabricToolsChannel = Radio.channel('fabricTools'),
	//~ fabricFilesChannel = Radio.channel('fabricFiles'),
	Marionette = require('backbone.marionette');

var _fileBrowser = require("./filesCollection.js");	

App.fileBrowser = new _fileBrowser;


 var view = Marionette.CompositeView.extend({
	tagName: "div",
	className : "fileBrowser loader",
	template: require('./filesCompositeView.html'),
		childViewContainer: "#content",
		childView: require('./itemView.js'),
  
	collection: App.fileBrowser ,
	collectionEvents: {
	// equivalent to view.listenTo(view.collection, "sync", view.itemAdded, view)
		"sync": function(e){
					this.$el.removeClass("loader");
		}
	},
	//~ events : {
		//~ "change input" : (ev) => { 
			//~ App.$.each(ev.target.files, function(){
				//~ fabricFilesChannel.trigger("add:file", this);	
			//~ });
		//~ } 
	//~ },
	onBeforeShow : function(){
		this.collection.fetch();
		//~ this.collection.setPageSize(5);
		
	},
	events  : {
		"click .nextPage" : 'next',
		"click .prevPage" : 'prev',
	},
	next : function(ev) {
		this.collection.getNextPage();
	},
	prev : function(ev) {
		this.collection.getPreviousPage();
		
	},

});
module.exports = view;
