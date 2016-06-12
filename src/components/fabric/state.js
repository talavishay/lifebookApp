module.exports = App.Backbone.Model.extend({
	localStorage: new App.Backbone.LocalStorage("viewport"),
	initialize:function(){
		//~ this.fetch();
	},
	defaults	:	{
		_id : "state",
		scale : 1,
		left :0,
		top : 0
	}
});
