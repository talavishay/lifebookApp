var backgrounds = require("./backgrounds");	
var view = {
	className : "fileBrowser backgroundBrowser loader",
	template: require('./backgroundBrowser.html'),
	model : App.colorPickerModel,
	behaviors: [
			{ behaviorClass: require('../behaviors/pager')},
	],
	childViewContainer: ".content",
	childView: require('./itemView'),
	collection:  new backgrounds ,
	collectionEvents: {
		"sync": function(e){
			this.$el.removeClass("loader");
		}
	},
	onBeforeShow : function(){
		this.collection.fetch();
	},
};
module.exports = App.Marionette.CompositeView.extend(view);
