var view = {
	template : require('./item.html'),
	Events : {
		"click" : "_addToPage"
	},
	_addToPage : function(){
		console.log(this.model);
	}
}
module.exports = App.Marionette.ItemView.extend(view)
