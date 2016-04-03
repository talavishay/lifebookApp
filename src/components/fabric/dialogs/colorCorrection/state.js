'use strict';
module.exports =  App.Backbone.Model.extend({
	localStorage: new App.Backbone.LocalStorage("colorCorrection"), // Unique name within your app.
	defaults : {
		_id:"state",
		result : false,
		src : false,
		tintcolor : "#fff",
		sharpen: 0,
		brightness: 0,
		contrast: 0,
		saturation: 0,
		hue: 0,
		colorize: 0,
	},
initialize:function(){
	this.fetch();
	App._.bindAll(this, "_revert", "_setup");

	this.listenTo(App.fabricToolsChannel, {
		"colorCorrection:restore" 	:this._revert,
		"image:add:done"			:this._setup,
		//~ "caman:done" 				:(data)=>{ this.save("result", data, {silent: true}) },
	}, this );

	this.on({
		"change":(ev)=>{App.fabricToolsChannel.trigger(	"caman:doit", this.attributes)},
	});
},
	_revert : function(){
		this.save(this.defaults, {
			silent 	: true,
			success : this._setup
		});
	},
	_setup 		: function(){
		var active = App.fabricToolsChannel.request('getActiveObject');
		if(active !== null && active.type === "image"){
			this.save("src", active.getSrc(), {silent: true});
			this.save("result", false,{silent: true});
		}
	},
});
