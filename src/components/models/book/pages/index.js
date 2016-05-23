module.exports = App.Backbone.Collection.extend({
		url		:	"/pages",
		model	:	App.models.page,
		parse : function(resp){
			return resp;
		}
});
