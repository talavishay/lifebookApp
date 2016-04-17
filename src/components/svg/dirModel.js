module.exports =  function(App){
var dirModel = {
	localStorage: new App.Backbone.LocalStorage("fileBrowser:svg"), // Unique name within your app.
	initialize:function(){
		this.fetch();
	},
	defaults : {
		_id:"dirs",
		"dirs" : [],
		"root" : ""
	},
};
return App.Backbone.Model.extend(dirModel);
};
