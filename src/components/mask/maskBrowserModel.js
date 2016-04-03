module.exports =  App.Backbone.Model.extend({
	defaults : {
"currentImgSrc" : "#",
		"collapsed" : true
	},
	initialize : function(){
		var active = App.fabricToolsChannel.request('getActiveObject');
		this.set("currentImgSrc", active);
	}
});
