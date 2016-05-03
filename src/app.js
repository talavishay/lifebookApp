'use strict';
module.exports = function(App){
var _App = {
	onBeforeStart			: function() {
		jQuery.get('/rest/session/token').done(function f(csrfToken){
			// Drupal8 rest POST/PATCHE/DELETE requirement
			App.csrfToken = 	csrfToken;
		});
		
		var layout = require('./components/layout');
		this.layout = new layout;//~ view.el : "body" ..
		this.layout.render();
	},
	onStart 				: function(options){
		App._.bindAll(this, '_keyboardAction');
		var options 	=  options || {"debug":'fabricTools'}; 
		if(options.debug) this._initBackboneRadioLog(options);

		require('./components/pages');
		require('./components/templates');
		
		this.files.fetch();
		this._setupLayoutRegions();
		App.$(document).on("keydown", this._keyboardAction);
	},
	_setupLayoutRegions		: function(options){
		App.layoutChannel.trigger('set:content', 		require('./components/fabric'));
		App.layoutChannel.trigger('set:toolbar', 		require('./components/toolbar') );
		App.layoutChannel.trigger('set:sidebarFirst', 	require('./components/sidebarFirst') );
		//~ this.layoutChannel.trigger('set:topToolbar', require('./components/topToolbar'));
		App.layoutChannel.trigger('set:bookPreview', 	require('./components/bookPreview'));
		App.layoutChannel.trigger('set:dialogs', 		require('./components/dialogs'));
	},
	_initBackboneRadioLog	: function(options){
		if(options.debug){
			App.Backbone.Radio.log = function( channelName, eventName ,args){
				eventName = typeof args === "undefined" ? eventName : args+' : '+eventName;
				App.log(eventName);
			};
			App.Backbone.Radio.tuneIn(options.debug);
		}
	},
	trig					: function(command, data){
			this.fabricToolsChannel.trigger(command, data);
	},
	_keyboardAction			: function(ev){
		//~ console.log(ev.keyCode);
if(ev.shiftKey){
	switch (ev.keyCode){
		case 37:// keyboard key = LEFT
			App.fabricToolsChannel.trigger("clip:move", "left");
		break;
		case 39:// keyboard key = RIGHT
			App.fabricToolsChannel.trigger("clip:move", "right");
		break;
		case 40:// keyboard key = DOWN
			App.fabricToolsChannel.trigger("clip:move", "down");
		break;
		case 38:// keyboard key = UP
			//~ App.fabricToolsChannel.trigger("object:move", "up");
			App.Backbone.Radio.trigger('fabricTools', "clip:move", "up");
		break;
		case 49:// keyboard key = 1
			App.fabricToolsChannel.trigger("clip:toggleControl");
		break;
	}
} else {
		switch (ev.keyCode){
		case 27:// keyboard key = ESC
			App.canvas.deactivateAll().renderAll();
		break;
		case 8:// keyboard key = del?
		case 46:// keyboard key = backs[pce]?
			App.fabricToolsChannel.trigger("object:delete");
			ev.preventDefault();
			return false;
		break;

		case 37:// keyboard key = LEFT
			App.fabricToolsChannel.trigger("object:move", "left");
		break;
		case 39:// keyboard key = RIGHT
			App.fabricToolsChannel.trigger("object:move", "right");
		break;
		case 40:// keyboard key = DOWN
			App.fabricToolsChannel.trigger("object:move", "down");
		break;
		case 38:// keyboard key = UP
			//~ App.fabricToolsChannel.trigger("object:move", "up");
			App.Backbone.Radio.trigger('fabricTools', "object:move", "up");
		break;
		case 49:// keyboard key = 1
			App.fabricToolsChannel.trigger("image:add", "DSC_0193.JPG");
		break;
		case 50:// keyboard key = 2
			App.fabricToolsChannel.trigger("dialog:colorCorrection");
		break;
		case 51:// keyboard key = 3
			App.fabricToolsChannel.trigger("dialog:dropShadow","dropShadow");
		break;
		case 52:// keyboard key = 4
			App.fabricToolsChannel.trigger("dialog:crop", App.fabricToolsChannel.request('getActiveObject').getSrc());
		break;
		case 53:// keyboard key = 5
			//~ App.fabricToolsChannel.trigger("KEYBOARD:EMPTY","5");
			App.fabricToolsChannel.trigger("dialog:templates");
		break;
		case 54:// keyboard key = 6
			//~ App.fabricToolsChannel.trigger("dialog:image");
		break;
		case 55:// keyboard key = 7
			App.fabricToolsChannel.trigger("add:text", "לחץ להוספת טקסט");
		break;
		case 56:// keyboard key = 8
			App.fabricToolsChannel.trigger("print");
		break;
		case 57:// keyboard key = 9
			App.fabricToolsChannel.trigger('dialog:fileBrowser')
		break;
		case 48:// keyboard key = 0
			App.fabricToolsChannel.trigger("dialog:close");
			//~ App.fabricToolsChannel.trigger("hide");
		break;

		case 189:// keyboard key => -/_
			App.fabricToolsChannel.trigger("zoom:out", .1);
		break;
		case 187:// keyboard key => =/+
			App.fabricToolsChannel.trigger("zoom:in", .1);

		break;


	
		}
	};
},
};
return  App._.extend(new App.Marionette.Application(_App), App);
};
