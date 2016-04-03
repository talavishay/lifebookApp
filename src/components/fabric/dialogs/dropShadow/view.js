'use strict';
var _state =require('./state.js');
var obj = {
	className	: 'shadow dialog shadowOptions',
	template	: require('./template.html'),
	model 		: new _state,
	ui 			: {
		restore 			:".restore",
		shadowTransperncy	:".transperncy",
		shadowAngle			:".angle",
		shadowDistance		:".distance",
		shadowScatter		:".scatter"
	},
	events		: {
		'input' : 'handleInput',
		//~ 'input @ui.shadowTransperncy' : 'setShadowTransperncy',
		//~ 'input @ui.shadowAngle' : 'setShadowAngle',
		//~ 'input @ui.shadowDistance' : 'setShadowDistance',
		//~ 'input @ui.shadowScatter' : 'setShadowScatter',
		"click @ui.restore" : "restore",
	},
	initialize :function(){
		App._.bindAll(this, "handleInput");
	},
	handleInput : App._.debounce(	function(ev){
		this.model.save(App.Backbone.Syphon.serialize(this));
	}, 200),
	//~ onBeforeRender : function(ev){
		//~ var obj = App.fabricToolsChannel.request('getActiveObject');
		//~ if(obj && !obj.getShadow()){
			//~ obj.setShadow({
				//~ color:	'rgba(0,0,0,.8)',
				//~ offsetX : obj.width*0.05,
				//~ offsetY : obj.height*0.05,
				//~ blur	: obj.width*0.03
			//~ });
		//~ };
		//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
	//~ restore : function(){
		//~ var obj = App.fabricToolsChannel.request('getActiveObject');
		//~ obj.clipTo = null

		//~ fabricToolsChannel.trigger('renderall');
	//~ },
	setShadow : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject'),
		_shadow = obj.getShadow();

		this.model.set(_shadow);

		obj.setShadow(_shadow);
		App.fabricToolsChannel.trigger('renderall');
	},
	//~ setShadowTransperncy : function(ev){
			//~ var obj = App.fabricToolsChannel.request('getActiveObject'),
				//~ _shadow = obj.getShadow();

			//~ _shadow.color = tinycolor(_shadow.color)
				//~ .setAlpha(ev.target.value)
				//~ .toRgbString();

			//~ obj.setShadow(_shadow);
			//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
	//~ setShadowAngle : function(ev){
			//~ var obj = App.fabricToolsChannel.request('getActiveObject');
			//~ var _shadow = obj.getShadow();
			//~ var angle = (180 - ev.target.value) * Math.PI / 180; // convert to radians
			//~ var distance = this.$el.find(".distance").val();

			//~ _shadow.offsetX = Math.round(Math.cos(angle) * distance);
			//~ _shadow.offsetY = Math.round(Math.sin(angle) * distance);
			//~ obj.setShadow(_shadow);
			//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
	//~ setShadowDistance : function(ev){
			//~ var obj = App.fabricToolsChannel.request('getActiveObject'),
				//~ _shadow = obj.getShadow(),

				//~ _angle = this.$el.find(".angle").val(),
				//~ angle = (180 - _angle) * Math.PI / 180, // convert to radians
				//~ x =  Math.round(Math.cos(angle) * ev.target.value),
				//~ y =  Math.round(Math.sin(angle) * ev.target.value);

				//~ _shadow.offsetX = x;
				//~ _shadow.offsetY = y;

			//~ obj.setShadow(_shadow);

			//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
	//~ setShadowScatter : function(ev){
			//~ var obj = App.fabricToolsChannel.request('getActiveObject');
			//~ var _shadow = obj.getShadow();
			//~ _shadow.blur = 	ev.target.value;
			//~ obj.setShadow(_shadow);
			//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
};
module.exports = App.Marionette.ItemView.extend(obj);
