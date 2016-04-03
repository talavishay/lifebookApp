//~ var Backbone = require('backbone');
module.exports = App.Backbone.Collection.extend({
	  localStorage: new App.Backbone.LocalStorage("sidebarFirst"), // Unique name within your app.
});
