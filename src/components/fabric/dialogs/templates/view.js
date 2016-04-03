'use strict';
var _m = require('./model');
module.exports = App.Marionette.ItemView.extend({
	template: require('./template.html'),
	model : new _m,
	ui : {
		"save" : ".save",
		"type" : ".type",
		"pageType" : ".pageType",
		"category" : ".category",
	},
	events		: {
		"click @ui.save" : "_save"
	},
	_save : function(){
		App.templates.addTemplate({
			type : this.ui.type.val(),
			pageType : this.ui.pageType.val(),
			category : this.ui.category.val(),
		});
		
	}
});
