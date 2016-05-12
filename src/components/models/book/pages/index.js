var pages = {
		url		: "/pages",
		model	: require('./page.js'),
		initialize : function(){
			//~ this.add(App.testdata.chapters);
			//~ this.fetch();
			
		},
		parse : function(data){
			return data;
		},
};
module.exports = App.Backbone.Collection.extend(pages);
