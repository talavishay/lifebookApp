var Marionette = App.Marionette;

module.exports = Marionette.Behavior.extend({
		events  : {
			"click h3" : '_toggle'
		},
		_toggle : function(ev){
			//~ this.$el.find('.content')
			//~ .toggleClass("collapsed");
			this.$el.parents(".collapsable")
			.toggleClass("collapsed");
		},
});
