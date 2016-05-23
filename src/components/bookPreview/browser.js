'use strict'
var view = {
		className	: "bookPreview",
		template : require('./browser.html'),
		childViewContainer: ".content",
		collection 	: App.pages,
		childView	: require('./pageView'),
		collectionEvents : {
				"sync" : "_render _done",
				"reset" : "_done",
				"remove" : "_render",
				"sort" : "_render",
		},
		_render :   function(){
			this.render();
		},
		_done :   function(){
			App.nprogress.done();
		},
		events : {
			"click .new" : "_add",
			"click .delete" : App.pages.removePage
		},
		_add : function(){
			if(!App.addingPage){
				App.pages.addPage();
			};
				
		}
};
module.exports = App.Marionette.CompositeView.extend(view);
