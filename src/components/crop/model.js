'use strict';
module.exports = App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("crop:state"), // Unique name within your app.
		initialize:function(){
			this.fetch();
		},
		defaults : {
			_id : "",
			croped : "#",
			coord : {"x":50,"y":50,"x2":150,"y2":150,"w":100,"h":100}
		},
});
