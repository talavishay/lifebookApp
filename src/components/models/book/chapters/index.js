var chapters = {
	url			: "/lifebook/my/chapters",
	model		: require('./chapter.js'),
	initialize	: function(){
		this.on({
			"all"	:	function(){
				App.bookChannel.trigger("chapters", this.models);
			}
		},this);
		this.listenTo(App.bookChannel,{
			"chapter:sort" : this.updateSort
		}, this);
	},
	updateSort : function(chapter, sortPages){
		if(!App.addingPage){
			var field_pages_ref = sortPages.map(function(item){
			var page;
			chapter.pages.each(function(_page){
				if(_page.composition.id == item.id){
					page = _page.id;
				};
			});
			if(page){
				//TODO: catch errors ?
				return {target_id : page, target_type : "pages"};
			};
		});
		chapter.save("field_pages_ref", field_pages_ref);
		}
	},
	//~ _getPages	:	function(chapter){
		//~ chapter.pages = new _pages(chapter.get("field_book_pages"));
		//~ chapter.pages.each(function(page){
			//~ page.fetch();
		//~ });
	//~ }
};
module.exports = App.Backbone.Collection.extend(chapters);
