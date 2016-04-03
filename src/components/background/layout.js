var	Marionette = App.Marionette,
	_backgroundBrowser = require('./backgroundBrowser.js')
	_colorPicker = require('../colorPicker');

module.exports =  Marionette.LayoutView.extend({
	template: require('./layout.html'),
	regions : {
			colorPicker : ".colorPicker",
			browser: ".backgroundBrowser",
	},
	onShow : function(ev){
		this.colorPicker.show(new _colorPicker(this.options));		
		this.browser.show(new _backgroundBrowser(this.options));		
	},
	behaviors: [{ behaviorClass: require('../behaviors/toggle')},
				{ behaviorClass: require('../behaviors/DropFiles')},
				],
	events : {
		"click .delete" : ()=>{
			App.fabricToolsChannel.trigger("object:background:remove");
		},
		"click .edit" : "_edit",
		"click .all" : "aplyBackgroundOnAllPages"
	},
	aplyBackgroundOnAllPages : function(){

		App.pages.forEach(function(m){
			var temp = JSON.parse(m.get("data"));
			// clear all backgrounds..			
			temp.background = ""
			temp.backgroundImage = "";
			temp.backgroundColor = "";
			temp.objects = App._.reject(temp.objects, {"name" : "background_grad"});
			
			temp.background = App.canvas.toJSON().background;
			temp.backgroundImage = App.canvas.toJSON().backgroundImage;
			
			var background_grad = App._.where(App.canvas.getObjects(), {"name" : "background_grad"});
			
			temp.objects.push(background_grad[0]);
			m.save({
				"data"	:	JSON.stringify(temp),
			});
			
		});
	},
	_edit : function(){
		var blob = App.dataURItoBlob(App.canvas.backgroundImage.toDataURL());
		App.fabricToolsChannel.trigger("background:edit", URL.createObjectURL(blob) );
	},
	_handleFiles : function (files) { 
			//used in =>  { behaviorClass: require('../behaviors/DropFiles')},
			App.fabricToolsChannel.trigger("add:background", URL.createObjectURL(files[0]));
	},
});
