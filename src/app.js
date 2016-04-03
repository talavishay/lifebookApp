'use strict';
var Backbone = require('backbone'),
	Radio =require('backbone.radio');
var jQuery = window.jQuery = require('jquery');
// jquery dependnt plugins
require('Jcrop');
require('jquery-mousewheel')(window.jQuery);
require('spectrum-colorpicker')(window.jQuery),
// jquery dependnt plugins ## END
Backbone.$ = window.jQuery;
delete window.jQuery;
var Marionette = require('backbone.marionette');

var App = new Marionette.Application({
	onBeforeStart : function() {
		jQuery.get('/rest/session/token').done(function f(csrfToken){
			// Drupal8 rest POST/PATCHE/DELETE requirement
			App.csrfToken = 	csrfToken;
		});
		this.fabricFilesChannel = this.Backbone.Radio.channel('fabricFiles');
		this.fabricToolsChannel = this.Backbone.Radio.channel('fabricTools');
		this.layoutChannel 		= this.Backbone.Radio.channel('layout');

		var layout = require('./components/layout');
		this.layout = new layout;//~ view.el : "body" ..
		this.layout.render();
		this.caman = require('./components/caman');
	},
	onStart : function() {



		require('./components/pages');
		require('./components/templates');
		var _s = require('./components/svg/dirModel');
		App.dirModel = new _s;
		this.layoutChannel.trigger('set:content', require('./components/fabric'));

		this.layoutChannel.trigger('set:toolbar', require('./components/toolbar') );
		this.layoutChannel.trigger('set:sidebarFirst', require('./components/sidebarFirst') );
		//~ this.layoutChannel.trigger('set:topToolbar', require('./components/topToolbar'));
		this.layoutChannel.trigger('set:bookPreview', require('./components/bookPreview'));


		//TODO:is this the bestplce fordepnedncies to be loaded..
		this._caman = this.caman.initialize();
		require('./components/jimp');



		this.listenTo(this.fabricToolsChannel, "print", function(multiplier){
			window.open(window.App.canvas.toDataURL({
			  format: 'png',
			  multiplier: 5
			}), "_blank");
		});
		this.Backbone.Radio.log = function( channelName, eventName ,args){
			eventName = typeof args === "undefined" ? eventName : args+' : '+eventName;
			App.log(eventName);
		};
		this.Backbone.Radio.tuneIn('fabricTools');
		_.bindAll(this, '_keyboardAction');
		this._events();
		//~ var i = window.setInterval(function(_state){
			//~ _state.save({
				//~ c : _state.get("c")+1
			//~ });
			//~ console.log(_state.toJSON());
		//~ },100,_state);
	},
	log:  function(event){
		if(  !/getActiveObject/.test(event) &&  !/zoom:(in|out)/.test(event) && !/svg:dirs/.test(event) && !/worker:img:mask/.test(event) ){
		//~ if(/caman/.test(event) ){
				var span = App.$('<span class="logText"/>').html(event);
				var msg = App.$('<div/>').append(span),
					log = App.$("#log");

				//~ if(!log.hasClass("active")){
					//~ log.html(msg);
					log.prepend(msg);
					_.delay(function(){
						//self destructing
						msg.hide().remove();
						//~ log.removeClass("active");
					}, 4500);
		}
	},
	trig : function(command, data){
			this.fabricToolsChannel.trigger(command, data);
	},
	_events : function(command){

			App.$(document).on("keydown", this._keyboardAction);
			//~ App.$(document).on("scroll", this._scrolldAction);
	},

	_keyboardAction : function(ev){
		var fabricToolsChannel = this.fabricToolsChannel;
		switch (ev.keyCode){

		case 8:// keyboard key = del?
		case 46:// keyboard key = backs[pce]?
			fabricToolsChannel.trigger("object:delete");
			ev.preventDefault();
			return false;
		break;

		case 37:// keyboard key = LEFT
			fabricToolsChannel.trigger("object:move", "left");
		break;

		case 37:// keyboard key = LEFT
			fabricToolsChannel.trigger("object:move", "left");
		break;
		case 39:// keyboard key = RIGHT
			fabricToolsChannel.trigger("object:move", "right");
		break;
		case 40:// keyboard key = DOWN
			fabricToolsChannel.trigger("object:move", "down");
		break;
		case 38:// keyboard key = UP
			//~ fabricToolsChannel.trigger("object:move", "up");
			App.Backbone.Radio.trigger('fabricTools', "object:move", "up");
		break;
		case 49:// keyboard key = 1
			fabricToolsChannel.trigger("image:add", "DSC_0193.JPG");
		break;
		case 50:// keyboard key = 2
			fabricToolsChannel.trigger("dialog:colorCorrection");
		break;
		case 51:// keyboard key = 3
			fabricToolsChannel.trigger("dialog:dropShadow","dropShadow");
		break;
		case 52:// keyboard key = 4
			fabricToolsChannel.trigger("dialog:crop", App.fabricToolsChannel.request('getActiveObject').getSrc());
		break;
		case 53:// keyboard key = 5
			//~ fabricToolsChannel.trigger("KEYBOARD:EMPTY","5");
			fabricToolsChannel.trigger("dialog:templates");
		break;
		case 54:// keyboard key = 6
			fabricToolsChannel.trigger("dialog:image");
		break;
		case 55:// keyboard key = 7
			fabricToolsChannel.trigger("add:text", "לחץ להוספת טקסט");
		break;
		case 56:// keyboard key = 8
			fabricToolsChannel.trigger("print");
		break;
		case 57:// keyboard key = 9
			fabricToolsChannel.trigger('dialog:show')
			//~ fabricToolsChannel.trigger("dialog:show");
		break;
		case 48:// keyboard key = 0
			fabricToolsChannel.trigger("dialog:close");
			//~ fabricToolsChannel.trigger("hide");
		break;

		case 189:// keyboard key => -/_
			fabricToolsChannel.trigger("zoom:out", .1);
		break;
		case 187:// keyboard key => =/+
			fabricToolsChannel.trigger("zoom:in", .1);

		break;
	}
},
});

window._ = App._ = require('underscore');
window.Backbone = Backbone ;

App.Backbone = window.Backbone;

App.Backbone.Radio = Radio;
App.Marionette = Marionette;
App.$ = Backbone.$;

Backbone.Model.prototype.idAttribute = '_id';

App.BackbonePouch = require("backbone-pouch");
App.PouchDB = require('pouchdb');
App.blobUtil = require("blob-util");
App.fileapi = require("fileapi");
//~ App.PouchDB.debug.enable('*');
App.objectHash = require('object-hash');
App.screenfull = require('screenfull');
App.dragDrop = require('drag-drop');
App.Backbone.LocalStorage = require("backbone.localstorage");
App.Backbone.syphon = require("backbone.syphon");
//~ App.Backbone.upload = require("backbone-model-file-upload");
App.Backbone.Hoard = require("backbone.hoard");

App.fabric = require('./components/fabric/fabric.custom.js');
App.models = require('./components/D8models')(App);

App.dataURItoBlob = require('./misc/dataURItoBlob.js');

window.App = App;
module.exports = window.App;
