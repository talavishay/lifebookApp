var Marionette = App.Marionette;

module.exports = Marionette.Behavior.extend({
	onAttach: function(){
		App.dragDrop(this.view.el, {
			onDrop :this._handleFiles,
		});
	},
	_handleFiles : function (files) {			
		App.fabricToolsChannel.trigger("crop", URL.createObjectURL(files[0]));
	}
});
