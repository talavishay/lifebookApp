var _m = require('./model'),
view = {
	template	: require("./chapters.html"),
	model		: new _m,
	events : {
		"change select" : "_switchChapter"
	},
	initialize	: function(){
		//~ this._chpaters();
		this.listenTo(App.fabricToolsChannel,{
			"chapters"		: this._chpaters,
			//~ "goto:chapter"	: this.switchChapter
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
		var pages = App.chapters.get(chapterId).pages,
			compositions = pages.map(function(model){
				return model.composition;
			});
		App.pages.set(compositions);
	},
	_switchChapter : function(ev){
		ev = App._.isString(ev) ? ev : ev.currentTarget.value;
		this.switchChapter(ev);
	}
};
module.exports = App.Marionette.ItemView.extend(view);
