var m = require('./maskBrowserModel.js');
var c = require("./masks.js")
 module.exports = App.Marionette.CompositeView.extend({
	className 	: "maskBrowser loader",
	childViewContainer: ".content",
	childView	: require('./itemView.js'),
	template	: require('./maskBrowser.html'),
	model 		: new m,
	collection	: new c,
	behaviors: [{ behaviorClass: require('../behaviors/toggle.js')},
				{ behaviorClass: require('../behaviors/pager.js')}],
	modelEvents: {
		"change" : "render",
		"change:active" : "_generatePreview"
	},
	
	initialize : function(){
		this.listenTo(App.fabricToolsChannel,{
			"tools:show" : this._generatePreview ,
		},this);
		App._.bindAll(this, "_generate");
	},
	_generatePreview: function(ev){
		var active = App.fabricToolsChannel.request('getActiveObject');
		if(active && this.model.get("active")){
			var	cache		= this.model.get("cache"),
				activeSrc	= active.getSrc();

			if(typeof cache === "undefined"  ){
				this.model.set("cache", activeSrc );
				cache = Date.now();
			}; 
			if( cache != activeSrc ){
				this.model.set("cache", activeSrc );
				App.blobUtil.dataURLToBlob(active.toDataURL({
					format: 'png',  multiplier: .1}))
					.then(this._generate);
			};
		};
	},
	_generate: function(blob){
		var imageUrl = URL.createObjectURL(blob);
		this.collection.each(function(model){
			App.fabricToolsChannel
				.request("worker:img:mask", imageUrl, model.get("mask"))
				.then(function(result) {
					model.set({
						src : result,
					});
				});
			});
	},
	
});
