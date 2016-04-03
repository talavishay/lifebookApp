'use strict';
var _s = require('./state.js');

module.exports = App.Marionette.ItemView.extend({
	className : 'dialog colorCorection',
	template: require('./template.html'),
	model :	new _s,
	ui 		: {
		restore :".restore",
		setTintColor : ".setTintColor"
	},
	events		: {
		"click @ui.restore" : "_revert",
		"click @ui.tintColor" : "getTintColor",
		"input" : "handleInput",
	},
	_revert : function(){
		this.model._revert();
		this.render();
	},
	initialize : function(){
		App._.bindAll(this, "_revert");

		this.listenTo( App.fabricToolsChannel, {
			"caman:status" : this._camanStatus
		}, this);
	},
	_camanStatus : function(data){
		console.log("caman status  : " + data );
		this.$el.toggleClass("working");
	},
	handleInput : App._.debounce(	function(ev){
		this.model.save(App.Backbone.Syphon.serialize(this));
	}, 200),

	getTintColor 	: function(ev){
		//~ var self = this,
			//~ _func = function(color){
				//~ this.model.set({"tintcolor" : color.toRgbString()});
				//~ if(color){
					//~ self.$el.find("#tintColor")
						//~ .attr("data-tintColor", color.toRgbString())
						//~ .css("background-color",color.toRgbString());
				//~ }
		//~ };
		//~ this._spectrum(null, _func);
		this._spectrum(null, (color)=>{
			this.model.set({"tintcolor" : color.toRgbString()});
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
					['black', 'white', 'blanchedalmond'],
					['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
				],
				change: _func,
				hide: function() {
					_elm.spectrum("destroy");
				}
		});
		setTimeout(function(){_elm.spectrum("show")},0);
	},

});
