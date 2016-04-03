'use strict';

module.exports =  App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("background:edit"), // Unique name within your app.
		initialize:function(){
			this.fetch();
		},
		defaults : {
			_id:"colorOptions",
			gradMode : false,
			type : "linear",
			dir : "topToBottom",
			colorStops : {
				"0" : "#090",
				"1" : "#ff0"
			},
		},
});
