'use strict';
var view = {
	template: require('./template.html'),
	className : 'pouch item file image loader',
	modelEvents: {
		"change": "render",
		"sync": "_sync"
	},
	events		: {
		"click img" : '_add_image_trig',
		"click .remove" : "_remove",
	},
	_sync : function(){
		this.$el.removeClass("loader");
	},
	_add_image_trig : function(ev){
		if(!ev.shiftKey){
			App.fabricToolsChannel.trigger("image:add", this.model.get("objectUrl"));
		} else {
			App.fabricToolsChannel.trigger("crop", this.model.get("objectUrl"));
		}
	},
	_remove : function(ev,g) {
		this.model.destroy();
	},
};
module.exports =  App.Marionette.ItemView.extend(view);
