var view = {
	template	: require('./list.html'),
	events	: {
		"click button#_GridViewChapters" : "_GridViewChapters",
		"click button#_GridViewPageObjects" : "_GridViewPageObjects",
		"click button#_GridViewPages" : "_GridViewPages"
	},
	_GridViewPages : function(){
		App.toolsChannel.request("GridView", App.pages);
	},
	_GridViewChapters : function(){
		App.toolsChannel.request("GridView:chapters", App.chapters);
	},
	_GridViewPageObjects : function(){
		if(!App.chapter) return;
		App.toolsChannel.request("GridView:pageObjects", App.chapter.pageObjects);
	},	
	_GridViewFiles : function(){
		App.toolsChannel.request("GridView:files", App.files);
	},	
};
module.exports = App.Marionette.CompositeView.extend(view)
