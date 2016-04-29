'use strict';
module.exports = App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("crop"), // Unique name within your app.
		initialize:function(){
			//~ this._setup();
		},
		_setup : function(){
			var obj 	= App.fabricToolsChannel.request('getActiveObject').toObject(),
				urlData	= App.resolver.extractUrl(obj.src);
			
			obj.file = App.files.get(urlData.id);
			this.set(obj);
		},
		defaults : {
			id : "state",
			croped : "#",
			coord : {"x":50,"y":50,"x2":150,"y2":150,"w":100,"h":100}
		},
});
