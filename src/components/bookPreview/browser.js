'use strict'
module.exports = App.Marionette.CompositeView.extend({
		className : "bookPreview",
		template : require('./browser.html'),
		childViewContainer: ".content",
		collection 	: App.pages,
		childView	: require('./pageView'),
		collectionEvents : {
				"sync" : "_render",
				"remove" : "_render",
		},
		_render :   function(){
			this.render();
		},
		events : {
			"click .new" : App.pages.addPage,
			"click .delete" : App.pages.removePage
		},
		initialize : function(){
			this.collection.fetch();
		}
});
