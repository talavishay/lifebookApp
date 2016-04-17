var Marionette = require('backbone.marionette');
	
module.exports = Marionette.LayoutView.extend({
	template : require('./layout.html'),
	
	regions : {
		"background" : "#background",
		"mask" : "#mask",
		"svg" : "#svg",
		"templates" : "#templates",
	},
	onShow : function(){
		//~ var view = require('../background');
		//~ this.background.show(new view);
		
		var view = require('../mask');
		this.mask.show(new view);
		
		var view = require('../svg');
		this.svg.show(new view);
		
		var view = require('../templateBrowser');
		this.templates.show(new view);
	}
	
});
