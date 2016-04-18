module.exports = function(App){
	return App.Backbone.Collection.extend({
		url : '/lifebook/compositions',
		model : App.D8models.composition ,
	})	
};
