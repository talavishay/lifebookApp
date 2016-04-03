'use strict';

module.exports =  App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("clipboard"), // Unique name within your app.
		initialize:function(){
			this.fetch();
		},
		defaults : {
			_id:"object",
			
		},
});
