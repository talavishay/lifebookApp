'use strict';
module.exports = App.Backbone.Model.extend({
	defaults : {
		src : "#",
		OrgSrc : "#",
		"data-extension" : "",
		"data-name" : "",
	},	
	initialize : function(){
		this.set("orgMask", this.get("src"));
	}
});
