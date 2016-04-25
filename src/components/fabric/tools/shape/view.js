var Model = require('./state.js');	
var textToolsView = {
	tagName		: 'span',
	className	: 'toolbox shape',
	template	: require('./template.html'),
	behaviors	: [
		{ behaviorClass: require('../objectBehaviour.js')}]
	,
	initialize	: function(object){
		this.model = new Model(object);
	},
	ui			:{
		strokeWidth : "select.strokeWidth",
		backgroundColor : ".boxBackgroundColor",
	},
	events 	:{
			'mouseup @ui.backgroundColor' : 'setBackgroundColor',
			'change @ui.strokeWidth' : 'setStrokeWidth',
	},
	toggleShaodw : function(){
		this.$el.find(".shadowOptions").toggle();
	},
	_spectrum : function(obj, _func){
		var _elm = this.$el;
		_elm.spectrum({
				showPalette: true,
				allowEmpty: true,
				hideAfterPaletteSelect:true,
				showAlpha: true,
				palette: [
					['black', 'white', 'blanchedalmond'],
					['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
				],
				change: _func,
				hide: function() {
					_elm.spectrum("destroy");
				}
		});
		setTimeout(function(){
			_elm.spectrum("show");
		},0);
	},
	setBackgroundColor: function (ev) {		
		var obj = App.fabricToolsChannel.request('getActiveObject');
		if(obj.getFill()){
			obj.setFill(null);
			App.fabricToolsChannel.trigger('renderall');
		} else {
			var _func = function(color) {
				if(color){
					obj.setFill(color.toRgbString());
					App.fabricToolsChannel.trigger('renderall');		
				}
			};
			this._spectrum(obj, _func);
		}		
	},
	setStrokeWidth : function (ev) {
			var obj = App.fabricToolsChannel.request('getActiveObject');
			obj.setStroke(true);
			obj.setStrokeWidth(ev.target.value);
			
			App.fabricToolsChannel.trigger('renderall');
	},

};
module.exports =  App.Marionette.ItemView.extend(textToolsView);
