'use strict';
module.exports = App.Marionette.ItemView.extend({
	tagName : "img",
	template: false,
	attributes: function () {
		var meta = this.model.get("meta"),
			preview =  JSON.parse(meta).preview;
		 
		return {
			src		: preview,
		};
	},
	events : {
		'click'	: "goToPage",
	
	},
	goToPage: function(){
		App.fabricToolsChannel.trigger("object:background:remove");
		App.canvas.clear();
		var data = this.model.get("data");
		//~ if(typeof data === "object"){
			//~ data = data[0].value;
		//~ }
		App.canvas.loadFromJSON(data, App.canvas.renderAll.bind(App.canvas));
	},
	
});
