App.models.pages = require('./page.js');
module.exports = App.Backbone.Collection.extend({
		url		:	"/pages",
		model	:	App.models.pages, 
});
