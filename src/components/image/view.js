var v = {
	tagname : img,
	template: false,
	model : require('./model'),
	attributes : function(){
		return {
			src : this.model.get("src")
		};
};
module.exports = App.Marionette.ItemView.extend(v);
