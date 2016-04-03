var Marionette = App.Marionette,
	_m = require('../background/model');
		

module.exports = Marionette.ItemView.extend({
	template	: require('./colorPicker.html'),
	model : new _m,
	behaviors	: [
		{ behaviorClass: require('../behaviors/gradSelector')},
	],
	modelEvents : {
		"change": "triggerSetBackground"
	},
	triggerSetBackground : function(ev){
		if(this.model.get("gradMode")){
			App.fabricToolsChannel.trigger("set:backgroundGrad", this.model.toJSON() );
		} else {
			App.fabricToolsChannel.trigger("set:backgroundColor", this.model.get("colorStops")["0"] );
		}
		this.render()
	},
});
