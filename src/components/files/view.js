'use strict';
var view = {
	template: require('./template.html'),
	className : 'item file loader',
	modelEvents: {
		"change": "render",
		"sync": "_sync"
	},
	events		: {
		"click" : "click" 
	},
	initialize : function(){
		App._.bindAll(this, "click");
	},
	_sync : function(){
		this.$el.removeClass("loader");
	},
	click :function(ev){
		if(ev.ctrlKey){
			this.model.destroy();
		};
		if(ev.shiftKey){
			this.model._toLocal();
		} else {
			this.model.collection.add({
				"id" : this.model.get("id")
			},{ parse : true });
			App.fabricToolsChannel.trigger("image:add", this.model.get('url') );
		};
	},
};
module.exports =  App.Marionette.ItemView.extend(view);
