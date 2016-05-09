'use strict';
var dialogs = {
	colorCorrection : require("./colorCorrection"),
	templates 		: require("./templates"),
	//~ image 			: require("./image"),
	backgroundEdit 	: require("../backgroundEdit"),
	crop 			: require("../crop"),
	fileBrowser		: require("../fileBrowser")(App),
	dropShadow 		: require("./dropShadow"),
	chapterBrowser 	: require("./chapterBrowser"),
};
module.exports =  App.Marionette.LayoutView.extend({
	tagName	: 'span',
	className : 'dialogs',
	template: require('./template.html'),
	regions	:	{
			"nav" : "#nav",
			"toolContent" : "#toolContent",
	},
	behaviors: [{ behaviorClass: require('./dialogsBehavior.js')}],
	childEvents: {
		render: "_show",
	},
	_show : function(){
		this.$el.show();
	},
	_hide : function(){
		this.$el.hide();
	},
	onShow 	:	function(){
		this.$el.hide();
	},
	initialize 	:	function(options){

		this.listenTo(App.fabricToolsChannel, {
			"all"			:(eventname)=>{
				var _split = eventname.split(':'),
					dialog = (_split.length === 2 && _split[0]  === "dialog") ? true : false ,
					dialogName = _split[1];
				if( dialog ) {
					this.$el.find("#title").text(dialogName);
					this.toolContent.show(new dialogs[dialogName] );
				}
			},
			"dialog:show"			:()=>{
				this._show()},
			"dialog:close"			:()=>{
				this._hide()},
			
			"background:edit"		:function(src){
				this.$el.find("#title").text('background edit');
				this.toolContent.show(new dialogs.backgroundEdit({"src" : src}));
			},
		}, this );
	},
});
