var model = {
	localStorage: new App.Backbone.LocalStorage("crop"),
	_setup : function(src){
		var obj = src ?
			{ src : src } :
			App.fabricToolsChannel.request('getActiveObject').toObject(),
			urlData	= App.resolver.extractUrl(obj.src);
		
		obj.file = App.files.get(urlData.id);
		this.set(obj);
		this.set("croped", "");
	},
	defaults : {
		id : "state",
		croped : "#",
		coord : {"x":50,"y":50,"x2":150,"y2":150,"w":100,"h":100}
	},
};
module.exports = App.Backbone.Model.extend(model);
