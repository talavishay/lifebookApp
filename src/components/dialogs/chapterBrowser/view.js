var _m = require('./model'),
view = {
	template	: require("./chapters.html"),
	model		: new _m,
	events : {
		"change select" : "_switchChapter"
	},
	initialize	: function(){
		this.listenTo(App.bookChannel,{
			"chapters"		: this._chpaters,
		}, this);
		this.model.on("add", this.render);
	},
	_chpaters	: function(){
		if(App.chapters){
			this.model.set("chapters", App.chapters.map(function(item){return {
				name : item.get("name"),
				id   : item.id
			}}));
		};
		this.render();
	},
	switchChapter : function(chapterId){
		var chapter = App.chapters.get(chapterId);
		App.pages.set(chapter.compositions.models);
		App.chapter = chapter;
	},
	_switchChapter : function(ev){
		ev = App._.isString(ev) ? ev : ev.currentTarget.value;
		this.switchChapter(ev);
	}
};
module.exports = App.Marionette.ItemView.extend(view);
