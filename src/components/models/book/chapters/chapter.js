var pages	= require('../pages/index.js');
var chapter = {
	idAttribute: "id",
	parse: function(resp) {
		this.pages = new pages(resp.field_book_pages);
		this.pages.chapter =  this;
		delete resp.field_book_pages;
		return this._fromExtendedJSON(resp);
	},
	defaults : {
		delta	: 0,
		title	: "",
		pages : {}
	},
	_fromExtendedJSON: function(resp) {
		resp = App._.mapObject(resp, function(val, key) {
			if(!App._.isUndefined(val[0].value)){
				return val[0].value;
			} else {
				return val;
			};
		});
		return resp;
	}
};
module.exports = App.Backbone.Model.extend(chapter);
