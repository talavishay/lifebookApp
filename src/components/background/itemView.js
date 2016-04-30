var view = {
	className : "item ",
	template: require('./template.html'),
	events : {
		"click" : function(){
			App.fabricToolsChannel.trigger("add:background", this.model.get("src"));
		},
	},
};
module.exports =  App.Marionette.ItemView.extend(view);

