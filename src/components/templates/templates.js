module.exports = function(App){
	return App.Backbone.Collection.extend({
		url : '/lifebook/templates',
		//~ localStorage: new App.Backbone.LocalStorage("book:pages"), // Unique name within your app.
		model : App.models.template ,
		//~ model : App.Composition,
		//~ sortBy :"pageNumber",
		
	})	
};
