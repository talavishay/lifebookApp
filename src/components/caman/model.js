'use strict';
var Backbone = require('backbone');

module.exports = App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("caman"), // Unique name within your app.
		//~ initialize:function(){
			//~ this.fetch();
		//~ },
		defaults : {
			_id : "process",
			
		},
});
