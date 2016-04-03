var m = require('./maskBrowserModel.js');
var c = require("./masks.js")
 module.exports = App.Marionette.CompositeView.extend({
	className 	: "maskBrowser loader",
	childViewContainer: ".content",
	childView	: require('./itemView.js'),
	template	: require('./maskBrowser.html'),
	model 		: new m,
	collection	: new c,

	initialize : function(){

		this.listenTo(App.fabricToolsChannel,{
			"tools:show" : this._generatePreview ,
			//~ "add:image:done" : this._generatePreview ,
			"dialog:imageMask:show" : this._expend,
			"dialog:imageMask:hide" : this._collapse,
		},this);

	},
	_generatePreview: function(ev){
		if( this.model.get("collapsed") ) {
			return;
		}
		var active = App.fabricToolsChannel.request('getActiveObject'),
			cache = this.model.get("cache" );

		//~ if(typeof active != "undefined" && active !== null ){
			var activeHash = App.objectHash( active.getSrc() );

			if(typeof cache === "undefined"  ){
				this.model.set("cache", active );
				var	cacheHash = App.objectHash( Date.now() );
			} else {
				var	cacheHash = App.objectHash( cache.getSrc() );
			};
			if( cacheHash != activeHash ){
				this.model.set("cache", active );
				var imageUrl= 	URL.createObjectURL(App.dataURItoBlob(active.toDataURL({
				  format: 'png',
				  //TODO :  Full size? image manipulation only if nesscery
				  //~  the smaller the FASTER ...
				  // this.setMaskedImage is only for the mask preview widget
				  // so no need for full size here
				  multiplier: .1
				})));
				this._generate(imageUrl);
			};
		//~ };

	},
	_generate: function(imageUrl){
		this.collection.each(function(model){
			App.fabricToolsChannel
				.request("worker:img:mask", imageUrl, model.get("orgMask"))
				.then(function(result) {
					model.set({
						src : result,
						currentImgSrc : imageUrl
					});
				});
			});

	},
	behaviors: [
		{ 	behaviorClass: require('../behaviors/pager.js') },
	],
	collectionEvents: {
		"sync": function(e){
			this.$el.removeClass("loader");
		},
	},
	modelEvents: {
		"change:collapsed change:currentImgSrc": "render",
	},
	events  : {
		"click h3" : '_toggle',
	},
	_toggle : function(){
		this.model.get("collapsed") ?
		this._expend() : this._collapse() ;
	},
	_expend : function(){
		var browser = this;
		this.collection.fetch({success: function(){
			browser.$el
			.parents(".collapsable").removeClass("collapsed");
			browser.model.set("collapsed", false);
			browser._generatePreview();
		}});
	},
	_collapse : function(){
		this.$el.parents(".collapsable").addClass("collapsed");
		this.model.set({
			"collapsed": true,
		});
		this.model.unset("cache");
		this.collection.reset();
	},

});
