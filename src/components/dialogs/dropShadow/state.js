'use strict';
var dropShaodw = {
	localStorage: new App.Backbone.LocalStorage("dropShadow"),
	initialize:function(){
		this.fetch();
		this.listenTo(App.fabricToolsChannel, {
			"dropShadow:restore" 	:this._revert,
			"tools:show"			:this._setup,
		}, this );

		this.on({
			"sync"	:this._change
		}, this);

		App._.bindAll(this, "_revert", "_setup");
	},
	_change : function(ev){
		var active = App.fabricToolsChannel.request('getActiveObject');

		active.setShadow(this.generateShadow(active));

		App.canvas.renderAll();
		//~ App.fabricToolsChannel.trigger('renderall');
		//App.fabricToolsChannel.trigger(	"dropshadow", this.attributes);
	},
	generateShadow : function(active){
		var _shadow  = this._setup(active);
		return this.scatter(this._distance(this.transperncy(_shadow)));
	},
	_revert : function(){
//TODO:_revert : function(){
		//~ this.save(this.defaults, {	silent 	: true,//~ success : this._setup
		//~ });
	},
	_setup 		: function(active){
		//~ var active = App.fabricToolsChannel.request('getActiveObject');
		if(active){
			var shadow = active.getShadow();
			return shadow !== null  ? shadow : this._setShadow(active);
		} else {
			return this.defaults;
		};
	},

	_setShadow : function(active){
		active.setShadow({
				color:	'rgba(0,0,0,.8)',
				offsetX : active.width*0.05,
				offsetY : active.height*0.05,
				blur	: active.width*0.03
		});
		return active.getShadow();
	},
	transperncy : function(shadow){
		var alpha = this.get("alpha"),
			color = this.get("color");

		shadow.color = tinycolor(color)
			.setAlpha(alpha)
			.toRgbString();
		return shadow
	},
	//~ setShadowAngle : function(ev){
		//~ var angle = this.get("angle");
			//~ _angle = (180 - angle) * Math.PI / 180; // convert to radians
		//~ var distance = this.$el.find(".distance").val();

		//~ _shadow.offsetX = Math.round(Math.cos(angle) * distance);
		//~ _shadow.offsetY = Math.round(Math.sin(angle) * distance);
		//~ obj.setShadow(_shadow);

		//~ App.fabricToolsChannel.trigger('renderall');
	//~ },
	_distance : function(_shadow){
		var distance = this.get("distance"),
			angle = this.get("angle"),

			angleRadian = (180 - angle) * Math.PI / 180, // convert to radians
			x =  Math.round(Math.cos( angleRadian ) * distance),
			y =  Math.round(Math.sin( angleRadian ) * distance);

		_shadow.offsetX = x;
		_shadow.offsetY = y;

		return _shadow;
	},
	scatter : function(shadow){
		shadow.blur = this.get("blur");
		return shadow;
	},

	defaults : {
		_id:"state",
		name :"dropShadow",
		color	: "rgba(0,0,0,1)",
		//~ id 		: 0,
		alpha 	: 0,
		distance: 0,
		angle	: 0,
		blur	: 0,
		//~ offsetX : 0,
		//~ offsetY : 0,
		//~ shadow 	: 0,
	},
};
module.exports =  App.Backbone.Model.extend(dropShaodw);
