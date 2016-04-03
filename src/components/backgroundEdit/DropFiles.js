var Marionette = App.Marionette;

module.exports = Marionette.Behavior.extend({
	onAttach: function(){
		App._.bindAll(this, "_handleFiles");
		App.dragDrop(this.view.el, {
			onDrop :this._handleFiles,
		});
		
	},
	_handleFiles : function (files) {
		var _url = URL.createObjectURL(files[0])
		App.fabricToolsChannel.trigger("background:edit", _url);
		//~ this.view.model.set("org", _url);
		//~ App.fabricToolsChannel.trigger("add:background", _url);
	}
});
