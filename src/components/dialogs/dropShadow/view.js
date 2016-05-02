'use strict';
var _state =require('./state.js');
var obj = {
	className	: 'shadow dialog shadowOptions',
	template	: require('./template.html'),
	model		: new _state(),
	ui 			: {
		restore 			:".restore",
	},
	events		: {
		'input' : 'handleInput',
		"click @ui.restore" : "restore",
	},
	initialize :function(object){
		App._.bindAll(this, "handleInput");
		this.listenTo(App.fabricToolsChannel, {
			"tools:show"			:this.onAttach,
		}, this );
	},
	onAttach :function(object){
		this.model 	= new _state();
		this.render();
	},
	handleInput :function(ev){
		this.model.set(App.Backbone.Syphon.serialize(this));
	},
};
module.exports = App.Marionette.ItemView.extend(obj);
