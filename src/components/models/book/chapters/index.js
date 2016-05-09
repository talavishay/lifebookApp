var chapters = {
	url			: "/testChapter",
	model		: require('./chapter.js'),
	initialize	: function(){
		this.on({
			"sync"	:	function(){
				App.fabricToolsChannel.trigger("chapters", this.models);
			}
		},this);
	},
	//~ _getPages	:	function(chapter){
		//~ chapter.pages = new _pages(chapter.get("field_book_pages"));
		//~ chapter.pages.each(function(page){
			//~ page.fetch();
		//~ });
	//~ }
};
module.exports = App.Backbone.Collection.extend(chapters);
