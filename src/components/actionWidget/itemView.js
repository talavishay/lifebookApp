var view = {
	template : require('./item.html'),
	modelEvents : {
		"change" : "render"
	},
	events : {
		"click" : "_addToPage"
	},
}
module.exports = App.Marionette.ItemView.extend(view);
