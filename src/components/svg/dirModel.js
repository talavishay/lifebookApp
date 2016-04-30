var dirModel = {
	localStorage: new App.Backbone.LocalStorage("fileBrowser:svg"), // Unique name within your app.
	//~ initialize:function(){
		//~ this.fetch();
	//~ },
	defaults : {
		_id:"dirs",
		"dirs" : [],
		"root" : "",
		active : false
	},
};
module.exports =  App.Backbone.Model.extend(dirModel);
