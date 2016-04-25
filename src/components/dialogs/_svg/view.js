'use strict';
var Marionette = require('backbone.marionette');

var svgView = Marionette.ItemView.extend({
	tagName	: 'div',
	className : 'svg',

	template: require('./template.html'),
	events  : {
		"click img" : (ev) => {
				App.canvas.add_svg(ev.currentTarget.currentSrc ,1,1);
			}
	},
});

module.exports =  svgView;
