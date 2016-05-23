var pageObjects = {
	model : require('./model'),
	initialize :  function(){
		this.listenTo(App.bookChannel,{
			"pageObject:remove:page" : this.removePageRef,
			"pageObject:add:page" : this.addPageRef,

		}, this);
	},
	removePageRef : function(id){
		this.get(id).removePageRef();
	},
	addPageRef : function(id){
		var pageObject = this.get(id),
			field_page = pageObject.get("field_page");
			
		if((_.isArray(field_page) && !field_page.length) || field_page === ""){
			pageObject.addPageRef();
		}
	},
};
module.exports =  App.Backbone.Collection.extend(pageObjects);
