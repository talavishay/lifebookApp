//~ var colorOptions = require('./model');	
var _fileBrowser = require("./filesCollection");	
var blob_util = require("blob-util");	

 var view = App.Marionette.CompositeView.extend({
	className : "fileBrowser backgroundBrowser loader",
	template: require('./backgroundBrowser.html'),
	model : App.colorPickerModel,
	behaviors: [
				{ behaviorClass: require('../behaviors/pager')},
				],
	childViewContainer: ".content",
	childView: require('./itemView'),
	collection:  new _fileBrowser ,
	collectionEvents: {
		"sync": function(e){
			this.$el.removeClass("loader");
		}
	},
	onBeforeShow : function(){
		this.collection.fetch();
	},
	
	
	//~ 
});
module.exports = view;
