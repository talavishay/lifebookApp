var Marionette = App.Marionette;

module.exports = Marionette.Behavior.extend({
		events  : {
			"click .nextPage" : 'next',
			"click .prevPage" : 'prev',
		},
		next : function(ev) {
			this.view.collection.getNextPage();
		},
		prev : function(ev) {
			this.view.collection.getPreviousPage();
		},
});
