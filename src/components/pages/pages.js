module.exports = function(App){
	return App.Backbone.Collection.extend({
		url : '/lifebook/compositions',
		//~ localStorage: new App.Backbone.LocalStorage("book:pages"), // Unique name within your app.
		model : App.models.composition ,
		//~ model : App.Composition,
		//~ sortBy :"pageNumber",
		
	})	
};
