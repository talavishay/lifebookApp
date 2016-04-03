var	Marionette = App.Marionette,
	_crop = require('./view.js')
	_colorPicker = require('../colorPicker');

module.exports =  Marionette.LayoutView.extend({
	template: require('./layout.html'),
	regions : {
			crop: ".crop",
			colorPicker : ".colorPicker"
	},
	onShow : function(ev){
		
		this.crop.show(new _crop(this.options));		
		this.colorPicker.show(new _colorPicker(this.options));		
	}
});
