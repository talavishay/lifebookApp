'use strict';
module.exports = App.Marionette.ItemView.extend({
	tagName : "img",
	template: false,
	attributes: function () {
		return this.model.attributes;
	},
	onAttach : function(){
		this.$el.on("dragstart" , this._ondragstart);
	},
	_ondragstart : function(ev){
		ev.originalEvent.dataTransfer.setData('text/plain', 'MW@EDJFEWGRTHKTGEF');
	},
	events : {
		"click" : 'triggerAddImage'
	},
	triggerAddImage : function(){
		App.fabricToolsChannel.trigger("image:add", this.model.get("src"));
	},

});
