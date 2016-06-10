module.exports = function(App){
	return App.Backbone.Collection.extend({
		url : '/lifebook/compositions',
		model : App.models.D8models.composition ,
	})	
};
