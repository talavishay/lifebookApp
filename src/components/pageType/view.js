pageNotes = {
	initialize : function(){
		this.listenTo(App.fabricToolsChannel, {
			"set:stage" : this._setPage
		}, this);
	},
	template : require('./template.html'),
	events : {
		"change select" : "handleInput"
	},
	handleInput : 	function(ev){
		if(ev.currentTarget.value !== "--"){
			this.model.save("field_page_type", ev.currentTarget.value);
		};
	},
	_setPage : function(page){
		this.model = page.refPage;
		this.render();
	}
};
module.exports = App.Marionette.ItemView.extend(pageNotes);
