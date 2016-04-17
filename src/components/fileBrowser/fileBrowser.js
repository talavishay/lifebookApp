module.exports = function(App){
	var fileBrowser = {
		template 	: require('./fileBrowser.html'),
		className : "fileBrowser",
		collection 	: App.files,
		childViewContainer: ".content",
		childView : require('./file.js')(App),
		events : {
			"change input" : (ev) => { 
				App.$.each(ev.target.files, function(){
					App.fabricFilesChannel.trigger("files:input:draft", this);
				});
			} 
		},
	};
	return App.Marionette.CompositeView.extend(fileBrowser);
}
