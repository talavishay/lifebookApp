var state = {
	localStorage: new App.Backbone.LocalStorage("colorCorrection"),
	initialize	: function(obj){
		this._setup(obj);
		App._.bindAll(this, "_revert", "_setup");
		this.on({
			"change:sharpen change:brightness change:contrast change:hue change:colorize change:saturation" : (ev)=>{
				App.fabricToolsChannel.trigger(	"caman:doit", this.attributes)
			},
		});
	},
	_setup 		: function(obj){
		if( /[i|I]mage/.test(obj.type) ){
			urlData = App.resolver.extractUrl(obj.getSrc());
			//~ .attributes)
			this.set({
				"file"	: App.files.get(urlData.id),
				"result"	: false
			},{silent: true});
		};
	},
	_revert : function(){
		this.set(this.defaults, {
			silent 	: true,
		});
		this._setup();
	},
	defaults : {
		_id			:"state",
		result		: false,
		src			: false,
		tintcolor	: "#fff",
		sharpen		: 0,
		brightness	: 0,
		saturation	: 0,
		contrast	: 0,
		hue			: 0,
		colorize	: 0,
	},
};
module.exports =  App.Backbone.Model.extend(state);
