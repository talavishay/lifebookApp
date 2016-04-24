'use strict';
var	fabricModel = require('./fabric.model.js');
var obj = {
	template	: false,
	tagName 	: 'canvas',
	model		: new fabricModel(),
	onShow		: (view)=>{view._initCanvas()},
	_initCanvas : function() {
		App.canvas = new App.fabric.Canvas(this.el,{
				width : this.model.get('width'),
				height : this.model.get('height')
		});
		this.canvas = App.canvas;
		App.canvas._view = this;
		this._Events();
		require('./worker');
		require('../clipboard');
		require('../fabricHistory');
//TODO: App.replace = true;
		App.replace = true;
	},
	_Events 	: function(){
		/* RADIO +*/
		App.fabricToolsChannel.reply({
			'getBackgroundObject':this.getBackgroundObject,
			'getActiveObject' 	: this.getActiveObject,
			//~ 'getActiveGroup' 	: this.getActiveGroup
		}, this);
		this.canvas.on({
			 //~ 'object:modified object:selected': this.showTools,
			 //~ 'selection:cleared' : this.hideTools,
			 //~ 'object:rotating object:moving' :  App._.debounce(this.hideTools, 500, true),
			 //~ 'object:moving' : this.updateClip,
		});
		this.listenTo(App.fabricToolsChannel,{
			"object:delete" 			:this.objectDelete,
			"object:background:remove" 	:this.backgroundDelete,
			"object:opacity"			:this.objectOpacity,
			//~ "object:clip" 				:this.clipSvg,
			"object:clip" 				:this.makeClipedObject,
			"object:move" 				:this.objectMove,
			"clip:move" 				:this.clipMove,
			"clip:toggleControl" 		:this.clipToggleControl,
			"object:move:rand"			:this._rand_positioning,
			"image:add caman:done" 		:this.addImage,
			"add:text" 					:this.addText,
			"add:background"			:this.dataURItoBackground,
			"set:backgroundOpacity" 	:this.setBackgroundOpacity,
			"set:backgroundColor"		:this.setBackgroundColor,
			"set:backgroundGrad"		:this.setBackgroundGradient ,
			"rebuildCanvas" 			:this.rebuildCanvas,
			"renderall"					:this.canvas.renderAll,
			"print"						:this.print,
		}, this);
	},
	print : function(multiplier) {
		window.open(window.App.canvas.toDataURL({
			  format: 'png',
			  multiplier: 3
		}), "_blank");
	},
	getActiveObject : function() {
		//~ var	_o = this.canvas.getActiveObject();
		//~ return _o ? _o : this.canvas.getActiveGroup();
		return this.canvas.getActiveObject();
	},
	showTools 	: function(options){
		var active = this.getActiveObject();
		if(typeof active != "undefined" && active !== null ){
			App.fabricToolsChannel.trigger("tools:show");
		}
	},
	hideTools 	: function(){
		App.fabricToolsChannel.trigger("tools:destroy");
	},
	rebuildCanvas : function(){
		this.canvas.renderAll();

		var obj = this.canvas.getActiveObject();
		var id = this.canvas.getObjects().indexOf(obj);
		var data = this.canvas.toJSON();

		this.canvas.loadFromJSON(data);
		this.canvas.renderAll();
		var active = this.canvas.getObjects()[id];
		canvas.setActiveObject(active);
		//~ fabricToolsChannel.trigger("show", {canvas : this.canvas, target : active});
	},
	scale	:	function(){
		var currentScale = this.model.get("scale");
		if(!currentScale){
			currentScale = ( window.innerHeight / App.$('#stage > div').height()  ) * .8 ;

			this.model.set("scale", currentScale);
		}
		return currentScale;
	},
	objectDelete : function(){
		var activeObject = this.canvas.getActiveObject(),
			activeGroup = this.canvas.getActiveGroup();
		if (activeObject) {
            this.canvas.remove(activeObject);
		} else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
			App._.each(objectsInGroup, function(object) {
				this.canvas.remove(object);
            }, this);
		};
	},
	objectOpacity 	: function(int){
		App.fabricToolsChannel.request('getActiveObject').setOpacity(int);
		App.fabricToolsChannel.trigger('renderall');
	},
	objectMove 	: function(ev){
		if(ev){
			var obj = App.fabricToolsChannel.request('getActiveObject'),
			//animation options for the movment
			options = {
				duration: 10,
				easing :  fabric.util.ease["easeOut"],
				onChange: this.canvas.renderAll.bind(this.canvas),
			},
			step = 20;
			switch (ev){
				case "left"	:obj.animate('left', '-=' + step  , options);break;
				case "right":obj.animate('left', '+=' + step  , options);break;
				case "down"	:obj.animate('top' , '+=' + step  , options);break;
				case "up"	:obj.animate('top' , '-=' + step  , options);break;
			};
		};
	},
	clipMove 	: function(ev){
		if(ev){
			
			var active = active || App.canvas.getActiveObject();
			if(active._cliper){
				var obj = active._cliper,
				//animation options for the movment
				options = {
					duration: 10,
					easing :  fabric.util.ease["easeOut"],
					onChange: this.canvas.renderAll.bind(this.canvas),
				},
				step = 20;
					
				switch (ev){
					case "left"	:obj.animate('left', '-=' + step  , options);break;
					case "right":obj.animate('left', '+=' + step  , options);break;
					case "down"	:obj.animate('top' , '+=' + step  , options);break;
					case "up"	:obj.animate('top' , '-=' + step  , options);break;
				};
			}
		}
	},
	promptReplaceImage : function(img){
		var	obj	= App.canvas.getActiveObject(),
			msg = "Replace current Active Object?";
			
//TODO: remove hardcoded msg .. msg = "Replace current Active Object?";
		if(obj && ( App.replace  || window.confirm(msg) ) ) {
			obj.setElement( img );
			
			// scale new image to obj dimensions
			if( obj && img.width > obj.width){
				obj.scale( obj.width / img.width );
			};
			App.canvas.renderAll();
			return true;
		} else {
			return false;
		}
	},
	_addImageElement 	: function(img){
		var img = (img instanceof Image) ? img : img.target;
		if( !this.promptReplaceImage(img)){
			var fabricImage = new fabric.Image(img);
			// scale new image to fit into canvas
			if( fabricImage.width > App.canvas.width){
				fabricImage.scale( App.canvas.width / fabricImage.width  );
			};
			App.canvas
				.add(fabricImage)
				.setActiveObject(fabricImage);
			//~ fabricImage.center();
			App.canvas.renderAll();
//TODO: fabric.js bug fix -- object are sometimes unselectable..
//
//even after renderAll..
//~ App.fabricToolsChannel.trigger('renderall');
// this is the hack/fix/remedy but moving is also undesired..
// need to track the orig bug.. and render as usall..
// maybe skip rendering ?? calcofffset or some other fabric crap...
			App.Backbone.Radio.trigger('fabricTools', "object:move", "up");
			App.Backbone.Radio.trigger('fabricTools', "image:add:done", "up");
		};
	},
	addImage 	: function(src, options){
		App._.bindAll(this, "_addImageElement");	
		this.loadImage(src).then(this._addImageElement);
	},
	loadImage 	: function(src){
		return new Promise( function(resolve, reject) {
			var img = new Image();
			img.onload = resolve;
			img.onerror = reject;
			img.src = src;
		});
	},
	_rand_positioning 	: function(obj){
		var randH = Math.round(150*Math.random()) * (Math.random() < 0.5 ? -1 : 1),
			randW = Math.round(150*Math.random()) * (Math.random() < 0.5 ? -1 : 1);
			obj.centerH().centerV();
			obj.setTop(obj.top + randH);
			obj.setLeft(obj.left + randW);
			this.canvas.calcOffset()
			this.canvas.renderAll();
			this.objectMove("up");//fabric bugfix.. object unselectable..
	},
	addText 	: function(text){
		//~ var text = new fabric.IText(text, {
		var text = new fabric.Textbox(text, {
				//~ width:this.canvas.width*.8,
				width	: 260,
				caching : false,
				fontFamily : 'nootregular',
				fontSize: 25,
				originX : 'left',
				originY : 'top',
				textAlign : 'center'
			}),
			h = this.canvas.height + text.height;

		text.set({
			left : this.canvas.width/10,
			top: _.random(h*.1, h*.3),
			//~ left : 10 ,
			//~ top:  this.canvas.height/3,
		});
		this.canvas.add(text);
	},
	addRect 	: function(options ){
		var canvas = this.canvas,
		_options = {
			left: (canvas.width - canvas.width / 3)*Math.random(),
			top: (canvas.height - canvas.height / 3)*Math.random(),
			fill: this.getRandomColor(),
			width: canvas.width / 3,
			height: canvas.height / 3,
			name : options.name?options.name:false
		};
		var options = (typeof options === "undefined") ? _options : options;
		var rect = new App.fabric.Rect(options);
		//TODO:  is this the best place to overide toObject ?
		// all fabric.js manipuation should be in ('./fabric.custom.js')
		rect.toObject = (function(toObject) {
			return function() {
				return App.fabric.util.object.extend(toObject.call(this), {
					name: this.name
				});
			};
		})(rect.toObject);

		canvas.add(rect);
		canvas.setActiveObject(rect);
		return rect;
	},
	getRandomColor : function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	},
	loadSvg	:	function(src){
		return new Promise(function(resolve, reject) {
			fabric.loadSVGFromURL(src, function(objects, options) {
				if (objects.length > 1) {
					var loadedObject = new fabric.PathGroup(objects, options);
				} else {
					var loadedObject = objects[0];
				}
				resolve(loadedObject);
			});
		});
	},
	makeClipedObject	: 	function(src){
		this.loadSvg(src).then(function(cliper){
			cliper.set("new", true);
			var active	= App.canvas.getActiveObject(),
				clipedObject	= new App.fabric.ClipedImage(active.getElement(), cliper, active.toObject() );
				//~ clipedObject	= new App.fabric.ClipedImage(active.getElement(), cliper);
			
			App.canvas.add(clipedObject);
			App.canvas.remove(active);
			
		});
	},
	
	clipToggleControl : function(active){
		var active = active || App.canvas.getActiveObject();
		if(active._cliper){
			active._cliper.selectable = !active._cliper.selectable ;
			active.selectable = !active.selectable ;

			active._cliper.bringForward();

			App.canvas.setActiveObject(active._cliper);
			
		};
		if(active._cliped){
			active._cliped.selectable = !active._cliped.selectable ;
			active.selectable = !active.selectable ;

			active._cliped.bringForward();
			App.canvas.setActiveObject(active._cliped);
			App.canvas.calcOffset();
		}
		App.canvas.calcOffset();
	},
	//~ function(){
	//~ canvas.on('object:moving', function(e) {
		//~ var obj = e.target;
		  
			//~ obj.set({
				//~ clipName: 'clip1',
				//~ clipTo: function(ctx) { 
							//~ return _.bind(clipByName, obj)(ctx) 
						//~ }
			//~ });
		  
	//~ },
	backgroundDelete	:	function (){
		var grad =this.canvas.getItemByName("background_grad");
		if( grad) { this.canvas.remove(grad)};
		this.canvas.setBackgroundImage(null);
		this.canvas.setBackgroundColor(null);
		this.canvas.renderAll();
	},
	//~ backgroundEdit	:	function (){
		//~ this.canvas.getItemByName("background_grad");

		//~ this.canvas.renderAll();
	//~ },
	dataURItoBackground	:	function (data){
		var canvas = this.canvas,
			options = {
				originX : 'center',
				originY : 'center',
				left : canvas.width/2,
				top : canvas.height/2,
				width : canvas.width,
				height : canvas.height,
			};
		canvas.setBackgroundColor(null);
		canvas.setBackgroundImage(data, canvas.renderAll.bind(canvas), options);
	},
	setBackgroundColor : function(color){//~ "add:backgroundColor");
		this.canvas.setBackgroundColor(color, this.canvas.renderAll.bind(this.canvas));
	},
	setBackgroundObject : function(){
		var canvas = this.canvas,
			_options = {
				top	:	0,
				left	:	0,
				//fill	:	getRandomColor(),
				width	:	canvas.width ,
				height	:	canvas.height ,
				originX : "left",
				originY : "top",
				hasControls : false,
				selectable: false,
				name : "background_grad"
			};
		var bg = this.addRect(_options);
		bg.sendToBack();
		return bg;
	},
	getBackgroundObject : function(){
		var bg = this.canvas.getItemByName("background_grad");
		if(!bg){
			return this.setBackgroundObject();
		}else{
			return bg;
		};
	},
	setBackgroundOpacity : function (int){
		var bg = this.canvas.getItemByName("background_grad");
		if(bg){
			bg.set("opacity", int);
			this.canvas.renderAll();
		};
	},
	setBackgroundGradient : function (options){
		//~ this.backgroundDelete();
		//~ this.canvas.remove(this.canvas.getItemByName("background_grad"));
		this.setGradient(this.getBackgroundObject(), options);
	},
	setGradient : function (object,  options){
		options = App._.extend(options ,this._objectToCoords(object, options.dir));

		if(options.type === "radial"){
			options = _.defaults({
				x1: object.width/2,
				y1: object.height/2,
				x2: object.width/2,
				y2: object.height/2,
				r2 : object.width*.4,

			}, options);
			if(options.dir !== "topToBottom"){
				options.colorStops = {
					"0": options.colorStops["1"],
					"1": options.colorStops["0"]
				};
			};
		};

		object.setGradient('fill', options);
		this.canvas.renderAll();
	},
	_objectToCoords : function(target, dir){
			var coords = {x1 : 0,	y1 : 0,	x2 : 0,	y2 : 0	};
			switch (dir){
				case "leftToRight" :
					coords.x2 = target.width;
				break;
				case "RightToleft" :
					coords.x1 = target.width;
				break;
				case "topToBottom" :
					coords.y2 = target.height;
				break;
				case "BottomToTop" :
					coords.y1 = target.height;
				break;
				case "BottomRightTotopLeft" :
					coords.x1 = target.width;
					coords.y2 = target.height;
				break;
				case "topLeftToBottomRight" :
					coords.x1 = target.width;
					coords.y1 = target.height;
				break;
			}
			return coords;
	},
	demo : function(){
		var that = this;// "add" rectangle onto canvas

		var rect = new fabric.Rect({
				left: 100,
				top: 500,
				fill: 'rgba(0,255,0,.8)',
				width: 120,
				height: 40,
				  shadow: 'rgba(0,0,0,0.4) 5px 5px 7px'
		});
		rect.setStroke(true);
		rect.setStrokeWidth(2);
		//~ var triangle = new fabric.Triangle({
		  //~ left:300,
		  //~ top: 450,
		  //~ width: 40,
		  //~ height: 40,
		  //~ fill: 'yellow'
		//~ });
		//~ var fImg = this.addImage('DSC_0193.JPG');

		//~ var options = {
				//~ duration: 1000,
				//~ easing :  fabric.util.ease["easeOutBounce"],
				//~ onChange: this.canvas.renderAll.bind(this.canvas)
			//~ };
		//~
		//~ fImg.setShadow({
				//~ color:	'rgba(0,0,0,.8)',
				//~ offsetX : 5,
				//~ offsetY : 15,
				//~ blur	: 10
			//~ });
			//~ //fImg.setCrossOrigin('anonymous');
			//~ var l = window.this.canvas.getWidth() - fImg.getWidth()/2-20;
			//~ var h = window.this.canvas.getHeight() - fImg.getHeight()/2-200;
			//~
			//~ fImg
				//~ .animate('left', '=' + l,	options)
				//~ .animate('top', '=' + h,	options);
		//~
		//~ var imgElement = document.getElementById('nuri');


		fabric.Image.fromURL('/DSC_0193.JPG', function(oImg) {
			oImg.set({
				scaleX:0.5,
				scaleY:0.5,
				stroke : 'black',
			});
			that.canvas.add(oImg);
		});

	},
};
module.exports = App.Marionette.ItemView.extend(obj);
