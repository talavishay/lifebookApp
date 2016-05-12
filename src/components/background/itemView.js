var view = {
	className : "item ",
	template: require('./template.html'),
	events : {
		"click" : function(){
			App.nprogress.start();
			
			App.fabricToolsChannel.trigger("add:background", this.model.get("org"));
		},
	},
};
module.exports =  App.Marionette.ItemView.extend(view);

