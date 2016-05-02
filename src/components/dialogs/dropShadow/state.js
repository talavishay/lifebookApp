var dropShaodw = {
	localStorage: new App.Backbone.LocalStorage("dropShadow"),
	initialize:function(){
		this.on({
			"change"	:this._change,
		}, this);
		this._setup();
	},
	_setup 		: function(){
		var active = App.fabricToolsChannel.request('getActiveObject');
		if(active){
			var shadow = active.getShadow();
			if(shadow){
				this.shadowToModel(active);
			} else{
				active.setShadow(this.generateShadow());
				App.canvas.renderAll();
			};
		};
	},
	_change : function(ev){
		App.fabricToolsChannel.request('getActiveObject')
			.setShadow(this.generateShadow());
		App.canvas.renderAll();
	},
	generateShadow : function(){
		return this.scatter(this._distance(this.transperncy()));
	},
	transperncy : function(){
		return {
			color : tinycolor(this.get("color"))
						.setAlpha(this.get("alpha"))
						.toRgbString()
		};
	},
	_distance : function(_shadow){
		var distance = this.get("distance"),
			angle = this.get("angle"),
			angleRadian = (180 - angle) * Math.PI / 180; // convert to radians

		_shadow.offsetX = Math.round(Math.cos( angleRadian ) * distance);
		_shadow.offsetY = Math.round(Math.sin( angleRadian ) * distance);
		return _shadow;
	},
	scatter : function(shadow){
		shadow.blur = this.get("blur");
		return shadow;
	},
	degrees : function(shadow){
		var angle = Math.atan2(shadow.offsetY, shadow.offsetX); // get angle in radians
		var discontinuity = angle * (180.0 / Math.PI); // convert to degrees
		return Math.round(180 + ( discontinuity * -1));// map to 0-360..
	},
	shadowToModel : function(active){
		var shadow = active.getShadow();
		if(shadow){
			this.set({
				color	: shadow.color,
				alpha 	: tinycolor(shadow.color).getAlpha(),
				distance: this.lineDistance(shadow),
				angle	: this.degrees(shadow),
				blur	: shadow.blur,
			});
		};
	},
	lineDistance : function ( shadow ){
		return Math.sqrt( Math.pow(shadow.offsetX, 2) + Math.pow(shadow.offsetY, 2));
	},
	defaults : {
		_id:"state",
		name :"dropShadow",
		color	: "rgba(0,0,0,1)",
		alpha 	: 0.8,
		distance: 10,
		angle	: 75,
		blur	: 10,
	},
};
module.exports =  App.Backbone.Model.extend(dropShaodw);
