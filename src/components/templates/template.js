//~ module.exports =  App.Backbone.Model.extend({
module.exports =  App.Composition.extend({
	//~ idAttribute = '_id';
	//~ localStorage: new App.Backbone.LocalStorage("book:pages"), // Unique name within your app.
	//~ initialize:function(){
		//~ this.fetch();
	//~ },
	defaults : {
		//~ _id:"page",
		data : '{"objects":[],"background":""}',
		preview : "#",
		pageNumber : 0,
		active : false
	},
	events 		: {
		"change:data" : "_preview"
	},
	_preview	: function(){
		this.save({"preview" : App.canvas.toDataURL({
						format: 'png',
						multiplier: .1})
		});
	}
})
