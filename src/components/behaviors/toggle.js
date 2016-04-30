module.exports = App.Marionette.Behavior.extend({
	events  : {
		"click h3" :  function(ev){
			//~ this.$el.parents(".collapsable")
				//~ .toggleClass("collapsed");
			this.view.model.set("active", !this.view.model.get("active"));
		},
	},
});
