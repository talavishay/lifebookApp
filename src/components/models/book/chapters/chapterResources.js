var chapterResources = {
	idAttribute	: "id",
	urlRoot		: '/lifebook/app/resources/chapter',
	initialize	: function(){
		App.Backbone.Model.prototype.initialize.apply(this, arguments);
		this.on({
			"sync"	: this._initChapter
		}, this);
	},
	_initChapter	: function(data){
		App.bookChannel.trigger("init:chapter", data);
	}
};
module.exports = App.Backbone.Model.extend(chapterResources);

