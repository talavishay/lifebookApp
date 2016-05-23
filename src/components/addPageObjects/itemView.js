var view = {
	template : require('./item.html'),
	modelEvents : {
		"change" : "render"
	},
	events : {
		"click" : "_addToPage"
	},
	_addToPage : function(){
		if(!this.model.get("field_page").length){
			App.fabricToolsChannel.trigger("add:pageObject", this.model);
		};
			
	}
}
module.exports = App.Marionette.ItemView.extend(view);
