'use strict';
var dialogs = {
	colorCorrection : require("./colorCorrection"),
	templates 		: require("./templates"),
	image 			: require("./image"),
	backgroundEdit 	: require("../../backgroundEdit"),
	crop 			: require("../../crop"),
	dropShadow 		: require("./dropShadow"),
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
		//~ this.toolContent.
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
					var obj = App.fabricToolsChannel.request('getActiveObject');
					this.toolContent.show(new dialogs[dialogName](dialogName) );
				}
				//~ console.log(_split);
			},
			"dialog:show"			:()=>{
				this._show()},
			"dialog:close"			:()=>{
				this._hide()},
			//~ "dialog:colorCorrection": function(){
				//~ this.$el.find("#title").text('color corection');
				//~ this.$el.find(".colorCorrectionBtn").addClass("active");
				//~ this.toolContent.show( new dialogs.colorCorrection() );
			//~ },
			//~ "dialog:image"			:function(){
				//~ this.$el.find("#title").text('image');
				//~ var obj = App.fabricToolsChannel.request('getActiveObject');
				//~ this.toolContent.show( new dialogs.image() );
			//~ },
			//~ "dialog:dropShadow"		:function(data,x){
				//~ this.$el.find("#title").text('shadow');
				//~ var obj = App.fabricToolsChannel.request('getActiveObject');
				//~ this.toolContent.show(new dialogs.dropShadow({
//~ x :0
				//~ }));
			//~ },
			"background:edit"		:function(src){
				this.$el.find("#title").text('background edit');
				this.toolContent.show(new dialogs.backgroundEdit({"src" : src}));
			},
			"dialog:crop"					:function(src){
				this.$el.find("#title").text('crop');
				this.toolContent.show(new dialogs.crop({"src" : src}));
			},
			//~ "dialog:templates"		:function(){
				//~ this.$el.find("#title").text('templates');
				//~ this.toolContent.show(new dialogs.templates());
			//~ },
		}, this );
	},
});
