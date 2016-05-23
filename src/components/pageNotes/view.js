pageNotes = {
	initialize : function(){
		this.listenTo(App.fabricToolsChannel, {
			"set:stage" : this._setPage
		}, this);
	},
	template : require('./template.html'),
	events : {
		"input textarea" : "handleInput"
	},
	handleInput : App._.debounce(	function(ev){
		this.model.save("field_comment", ev.currentTarget.value);
	}, 1500),
	_setPage : function(page){
		this.model = page.refPage;
		this.render();
	}
};
module.exports = App.Marionette.ItemView.extend(pageNotes);
