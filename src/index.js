window._	= require('underscore');
window.jQuery	= require('jquery');
window.Backbone	= require('backbone');
window.PouchDB  = require('pouchdb');
//~ window.PouchDB.plugin(require('pouchdb-find'));

App = {
  _ : window._,
  jQuery  : window.jQuery,
  $       : window.jQuery,
  Backbone: window.Backbone,	
  PouchDB : window.PouchDB,	
};
require('./_tools/boot/progress.js');

App = App._.extend({
/***********************************************************************
	//TODO: this need to go into a "setup" phase ..?	
	//TODO: impllement "setup" phase .. & ?? phases if your allready there +tea
	//~ jimp				: require('./components/jimp'),
	//~ await 				: require('await'),
	//~ dataURItoBlob 		: require('./misc/dataURItoBlob.js'),
	//~ dragDrop			: require('drag-drop'),
***********************************************************************/
	routePattern		: require('route-pattern'),
	blobUtil			: require('blob-util'),
	//TODO: replace objectHash.. got to be some hash in pouch ..
	objectHash			: require('object-hash'),
	BackbonePouch		: require('backbone-pouch'),
	// editables
	backgrid 		 	: require('backgrid'),
	fabric 				: require('./components/fabric/fabric.custom.js'),
	screenfull			: require('screenfull'),

}, App);

App.Backbone = App._.extend({
	/*	##Backbone Plugins 
	//~ Backbone.upload : require('backbone-model-file-upload'),
	//~ Backbone.Hoard		: require('backbone.hoard')
	*******************************************************************/
	Radio				  : require('backbone.radio'),
	LocalStorage  : require('backbone.localstorage'),
	syphon 				: require('backbone.syphon'),
}, Backbone);

 
App = App._.extend({
	fabricToolsChannel	: App.Backbone.Radio.channel('fabric'),
	layoutChannel		: App.Backbone.Radio.channel('layout'),
	toolsChannel		: App.Backbone.Radio.channel('tools'),
	bookChannel			: App.Backbone.Radio.channel('book'),
  fabricFilesChannel			: App.Backbone.Radio.channel('files'),
}, App);

App.toolsChannel._tools = require('./_tools/index.js');
App.bookChannel._tools = require('./components/models/book') ;

// jquery dependnt plugins
//~ require('jcrop');
App.Marionette 	= require('backbone.marionette');
//TODO: load maroionette depends on window.backbone/jquery/????
//~ PouchDB.debug.enable('*');

/***********************************************************************
 * internal dependencies / app modules.. mvc..
 * 
//TODO:  manage the load depnedncies 
//TODO: impllement "setup" phase .. & phases if your allready there +tea
***********************************************************************/
//~ VIEWS
App.Marionette._views = {
	layout		: require('./components/layout'),
};
App.views = {
	//~ view.el : "body" ..
	layout	: new App.Marionette._views.layout
};
//~ MODELS	& collections
App.models 		=  {
	D8models	: require(
		'./components/models/D8models'),
	files			: require(
		'./components/models/file'),
	chapter		: require(
		'./components/models/book/chapters/chapter.js'),
	page 			: require(
		'./components/models/book/pages/page.js'),
	composition 	: require(
		'./components/models/book/pages/comp.js'),
};
App.collections	= require('./components/collections') || {};
App.collections = App._.extend({
	chapters	: require(
		'./components/models/book/chapters/index.js'),
	pages		: require(
		'./components/models/book/pages/index.js'),
	pageObjects	: require(
	'./components/models/book/chapters/pageObjects/index.js'),
}, App.collections);

App.files			= new App.collections.files;
App.files.fetch();
App.Book			= App.bookChannel._tools|| {};
App.Book.chapters	= new App.collections.chapters;

// canvas image url resolver
App.crop			= require('./components/croper')();
// pre canvas save image validation ( persistance ?)
App.resolver		= require('./components/resolver')(App);
//TODO: browserify caman ... script is loaded in index.html ..
//~ App.caman = require('./components/caman').initialize();App.caman.initialize();



require('./components/user');

/***********************************************************************
***********************************************************************/
require('jquery-mousewheel');
require('spectrum-colorpicker');

var app = require('./app');
App.$ = App.jQuery;
app.start();
App.Backbone.history.start({
	root: document.location.pathname
});
App.fabricToolsChannel.trigger("dialog:chapterBrowser");
