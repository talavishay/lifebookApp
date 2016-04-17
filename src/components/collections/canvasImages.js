module.exports = function(App){
var canvasImages = {
	model: require("../models/file/draft.js")(App),
	sync: App.BackbonePouch.sync({
		db: App.PouchDB('canvasImages'),
	}),
};
return App.Backbone.Collection.extend(canvasImages);
};
