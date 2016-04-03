'use strict';
var Backbone = require('backbone');

module.exports = App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("background:edit"), // Unique name within your app.
		initialize:function(){
			this.fetch();
		},
		defaults : {
			_id : "crop",
			croped : "#",
			coord : {"x":50,"y":50,"x2":150,"y2":150,"w":100,"h":100},
		},
});
