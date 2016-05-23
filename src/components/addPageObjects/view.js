var view = {
	template	: require('./list.html'),
	//~ collection	: ,
	childView	: require('./itemView.js'),
	childViewContainer: ".list",
	initialize	: function(){
		this.listenTo(App.fabricToolsChannel,{
			"pageObjects:reset" : this.loadObjects,
		}, this);
		this.listenTo(App.bookChannel,{
			"chapter:sort" : this.render
		}, this)
			
	},
	loadObjects	: function(pageObjects){
		this.collection = pageObjects;
		this.render();
	}
};
module.exports = App.Marionette.CompositeView.extend(view)
