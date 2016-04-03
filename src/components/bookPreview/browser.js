'use strict'
module.exports = App.Marionette.CompositeView.extend({
		className : "bookPreview fileBrowser",
		template : require('./browser.html'),
		childViewContainer: ".content",
		collection 	: App.pages,
		childView	: require('./pageView'),
		collectionEvents : {
				"sync" : "_render",
				//~ "add" : "_render",
				"remove" : "_render",
				//~ "all" : function(ev){
					//~ console.log(ev);
				//~ },
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
