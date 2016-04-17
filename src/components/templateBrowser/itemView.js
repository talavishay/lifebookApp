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
	goToPage: function(ev){
		if(ev.ctrlKey){
			this.model.destroy();
		} else {
			App.nprogress.start();
			App.fabricToolsChannel.trigger("object:background:remove");
			App.canvas.clear();
			App.resolver
				.initialize(JSON.parse(this.model.get("data")))
				.then(function(stage){
					App.canvas.loadFromJSON(stage, App.canvas.renderAll.bind(App.canvas));
					App.nprogress.done();
				});
		};
		//~ App.canvas.loadFromJSON(data, App.canvas.renderAll.bind(App.canvas));
	},
	
});
