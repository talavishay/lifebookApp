var _s = require('./state.js');
var view = {
	className	: 'dialog colorCorection',
	template	: require('./template.html'),
	initialize	: function(){
		App._.bindAll(this, "_revert");
		var obj		= App.fabricToolsChannel.request('getActiveObject');
		this.model	= new _s(obj);
	},
	ui 			: {
		restore		: ".restore",
		setTintColor: "#tintColor"
	},
	events		: {
		"click @ui.restore" : "_revert",
		"click @ui.setTintColor" : "getTintColor",
		"input" : "_input"
	},
	_revert		: function(){
		this.model._revert();
		this.render();
	},
	_input		: function(){
		App.nprogress.start();
		this.handleInput();
	},
	handleInput : App._.debounce(	function(ev){
		this.model.set(App.Backbone.Syphon.serialize(this));
	}, 500),

	getTintColor 	: function(ev){
		this._spectrum(null, (color)=>{
			this.model.set({"tintcolor" : color.toHexString()});
			this.render();
		});
	},
	_spectrum 		: function(obj, _func){
		var _elm = this.$el;
		_elm.spectrum({
				showPalette: true,
				allowEmpty: true,
				hideAfterPaletteSelect:true,
				showAlpha: false,
				palette: [
					['black', 'white', 'blanchedalmond'],['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
				],
				change: _func,
				hide: function() {
					_elm.spectrum("destroy");
				}
		});
		setTimeout(function(){_elm.spectrum("show")},0);
	},
};
module.exports = App.Marionette.ItemView.extend(view);
