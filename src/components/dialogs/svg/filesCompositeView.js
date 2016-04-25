var	Marionette = require('backbone.marionette');

var _fileBrowser = require("./filesCollection.js");	

App.svgBrowser = new _fileBrowser;


 var view = Marionette.CompositeView.extend({
	className : "fileBrowser svgBrowser loader",
	template: require('./filesCompositeView.html'),
	childViewContainer: "#content",
	childView: require('./itemView.js'),
  
	collection: App.svgBrowser ,
	collectionEvents: {
		"sync": function(e){
					this.$el.removeClass("loader");
		}
	},
	onBeforeShow : function(){
		this.collection.fetch();
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
