
//var fabric = require('../../../bower_components/fabric.js/dist/fabric.js').fabric
var fabric = require('fabric').fabric

fabric.Canvas.prototype.getAbsoluteCoords = function(object) {
	var bound = object.getBoundingRect();
	return {
	  right: this._offset.left + bound.left  + bound.width ,
	  bottom: this._offset.top + bound.top  + bound.height +20
	};
};

fabric.Canvas.prototype.getAbxxxxxxx = function(object) {
	var bound = object.getBoundingRect();
	return {
	  right: this._offset.left + bound.left  + bound.width ,
	  bottom: this._offset.top + bound.top  + bound.height +20
	};
};


fabric.Cropzoomimage = fabric.util.createClass(fabric.Image, {
	type: 'cropzoomimage',
	async : true,
	zoomedXY: false,
	initialize: function(element, options) {
		options || (options = {});
		this.callSuper('initialize', element, options);
		this.set({
			orgSrc: element.src,
			cx: 0, // clip-x
			cy: 0, // clip-y
			cw: element.width, // clip-width
			ch: element.height // clip-height
		});
	},

	zoomBy: function(x, y, z, callback)
	{
		if (x || y) { this.zoomedXY = true; }
		this.cx += x;
		this.cy += y;

		if (z) {
			this.cw -= z;
			this.ch -= z/(this.width/this.height);
		}

		if (z && !this.zoomedXY) {
			// Zoom to center of image initially
			this.cx = this.width / 2 - (this.cw / 2);
			this.cy = this.height / 2 - (this.ch / 2);
		}

		if (this.cw > this.width) { this.cw = this.width; }
		if (this.ch > this.height) { this.ch = this.height; }
		if (this.cw < 1) { this.cw = 1; }
		if (this.ch < 1) { this.ch = 1; }
		if (this.cx < 0) { this.cx = 0; }
		if (this.cy < 0) { this.cy = 0; }
		if (this.cx > this.width - this.cw) { this.cx = this.width - this.cw; }
		if (this.cy > this.height - this.ch) { this.cy = this.height - this.ch; }

		this.rerender(callback);
	},

	rerender: function(callback)
	{
		var img = new Image(), obj = this;
		img.onload = function() {
			var canvas = fabric.util.createCanvasElement();
			canvas.width = obj.width;
			canvas.height = obj.height;
			canvas.getContext('2d').drawImage(this, obj.cx, obj.cy, obj.cw, obj.ch, 0,0, obj.width, obj.height);

			img.onload = function() {
				obj.setElement(this);
				obj.applyFilters(window.App.canvas.renderAll.bind(window.App.canvas));
				obj.set({
					left: obj.left,
					top: obj.top,
					angle: obj.angle
				});
				obj.setCoords();
				if (callback) { callback(obj); }
			};
			img.src = canvas.toDataURL('image/png');
		};
		img.src = this.orgSrc;
	},

	toObject: function()
	{
		return fabric.util.object.extend(this.callSuper('toObject'), {
			orgSrc: this.orgSrc,
			cx: this.cx,
			cy: this.cy,
			cw: this.cw,
			ch: this.ch
		});
	}
});
fabric.Cropzoomimage.fromObject = function(object, callback) {
	fabric.util.loadImage(object.src, function(img) {
		fabric.Image.prototype._initFilters.call(object, object, function(filters) {
			object.filters = filters || [];
			var instance = new fabric.Cropzoomimage(img, object);
			if (callback) { callback(instance); }
		});
	}, null, object.crossOrigin);
};
fabric.Image.filters.Tint.prototype.applyTo = function (canvasEl) {
    var context = canvasEl.getContext('2d'),
        imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
        data = imageData.data,
        iLen = data.length,
        i,
        tintR, tintG, tintB,
        r, g, b, alpha1,
        source;

    source = new fabric.Color(this.color).getSource();

    tintR = source[0] * this.opacity;
    tintG = source[1] * this.opacity;
    tintB = source[2] * this.opacity;

    alpha1 = 1 - this.opacity;

    for (i = 0; i < iLen; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        // fabric's actual computation
        data[i] = tintR + r * alpha1;
        data[i + 1] = tintG + g * alpha1;
        data[i + 2] = tintB + b * alpha1;

        // Luc's computation
        data[i] = (tintR * r) / 255;
        data[i + 1] = (tintG * g) / 255;
        data[i + 2] = (tintB * b) / 255;
    }

    context.putImageData(imageData, 0, 0);
};


// fabric_canvas)view ## START
fabric.Object.prototype.borderColor = 'blue';
fabric.Object.prototype.cornerColor = 'red';
fabric.Object.prototype.cornerSize = 20;
fabric.Object.prototype.borderOpacityWhenMoving =1;
fabric.Object.prototype.borderScaleFactor= 4;

fabric.Object.prototype.perPixelTargetFind = true;
fabric.Textbox.prototype.perPixelTargetFind = false;
		//~ this.targetFindTolerance = 4;;
//~ fabric.Image.prototype.lockUniScaling = true;


/**
 * Item name is non-unique
 */
fabric.Canvas.prototype.getItemsByLifebookType = function(name) {
  var objectList = [],
	  objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
	if (objects[i].lifebook_type && objects[i].lifebook_type === name) {
	  objectList.push(objects[i]);
	}
  }

  return objectList;
};
/**
 * Item name is non-unique
 */
fabric.Canvas.prototype.getItemsByName = function(name) {
  var objectList = [],
	  objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
	if (objects[i].name && objects[i].name === name) {
	  objectList.push(objects[i]);
	}
  }

  return objectList;
};
/**
 * Item name is unique
 */
fabric.Canvas.prototype.getItemByName = function(name) {
  var object = null,
	  objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
	if (objects[i].name && objects[i].name === name) {
	  object = objects[i];
	  break;
	}
  };
  if(object === null){
	  return false;
	} else {
		return object;
	};
};

fabric.Canvas.prototype.add_svg = function(src, xscale, yscale){
	fabric.loadSVGFromURL(src, function(objects, options) {
		var loadedObject;
		if (objects.length >= 1) {
			loadedObject = new fabric.PathGroup(objects, options);
		} else {
			loadedObject = objects[0];
		}

		App.canvas.add(loadedObject);
		App.canvas.setActiveObject(loadedObject);
		App.canvas.renderAll();
	});

};
fabric.Canvas.prototype.calcTransformMatrix =  function(obj) {
	var multiplyMatrices = fabric.util.multiplyTransformMatrices,
		center = obj.getCenterPoint(),
		translateMatrix = [1, 0, 0, 1, center.x, center.y],
		rotateMatrix = this._calcRotateMatrix(obj),
		dimensionMatrix = obj._calcDimensionsTransformMatrix(obj.skewX, obj.skewY, true),
		matrix = obj.group ? this.calcTransformMatrix(obj.group) : [1, 0, 0, 1, 0, 0];
	matrix = multiplyMatrices(matrix, translateMatrix);
	matrix = multiplyMatrices(matrix, rotateMatrix);
	matrix = multiplyMatrices(matrix, dimensionMatrix);
	return matrix;
};
fabric.Canvas.prototype._calcDimensionsTransformMatrix =  function(obj, skewX, skewY, flipping) {
	var multiplyMatrices = fabric.util.multiplyTransformMatrices,
		skewMatrixX = [1, 0, Math.tan(degreesToRadians(skewX)), 1],
		skewMatrixY = [1, Math.tan(degreesToRadians(skewY)), 0, 1],
		scaleX = obj.scaleX * (flipping && obj.flipX ? -1 : 1),
		scaleY = obj.scaleY * (flipping && obj.flipY ? -1 : 1),
		scaleMatrix = [scaleX, 0, 0, scaleY],
		m = multiplyMatrices(scaleMatrix, skewMatrixX, true);
	return multiplyMatrices(m, skewMatrixY, true);
};
fabric.Canvas.prototype._calcRotateMatrix =  function(obj) {
      if (obj.angle) {
        var theta = fabric.util.degreesToRadians(obj.angle),
			cos = Math.cos(theta),
			sin = Math.sin(theta);
        return [cos, sin, -sin, cos, 0, 0];
      };
      return [1, 0, 0, 1, 0, 0];
};
fabric.ClipedImage = fabric.util.createClass(fabric.Image, {
	type: 'clipedImage',
	async : true,
	initialize: function( element, _cliper, options, fromObject ) {
		options || (options = {});
		
		if(_cliper.new){
			_cliper.set({
				'top' : options.top,
				'left' : options.left,
				'angle' : options.angle,
			});
			_cliper.scaleToWidth( options.width );
		};
		this.set({
			'_cliper' : _cliper,
		});
		this._events();
		var _opt = App._.omit(options, "clipTo", "type", "_cliper");
		this.callSuper('initialize', element, _opt);
		if(!options.scale && this.getWidth() > App.canvas.getWidth()){
			this.scale( App.canvas.getWidth() / this.getWidth()  );
		};
		
		if(_cliper.getHeight() > this.getHeight()){
				_cliper.scaleToHeight( this.getHeight() );
		};
	},
	clipTo : function(ctx) {
		ctx.save();
		var myMatrix = App.canvas.calcTransformMatrix(this);
		myMatrix = fabric.util.invertTransform(myMatrix);
		ctx.transform.apply(ctx, myMatrix);
		this._cliper.render(ctx);
		ctx.restore();
	},
	_events		: function(){
		this.on("mousedown", function(ev, b){
			this._startPosition = {
				top		: this.getTop(),
				left	: this.getLeft(),
				angle	: this.getAngle(),
				scaleY	: this.getScaleY(),
				scaleX	: this.getScaleX(),
			};
		});
		
		this.on("rotating", function(ev, b){
			if(ev.e.shiftKey){
				this.setAngle(this._startPosition.angle);
				this._cliper.setAngle(this._cliper.getAngle()+ (ev.e.movementY * -1));
			}
		});
	
		this.on("moving", function(ev, b){
			if(ev.e.shiftKey){
				this.updateClipPos(ev);
				this.setTop(this._startPosition.top);
				this.setLeft(this._startPosition.left);
			};
		});
		
		this.on("scaling", function(ev, b){
			if(ev.e.shiftKey){
				this.updateClipScale(ev);
				this.setScaleY(this._startPosition.scaleY);
				this.setScaleX(this._startPosition.scaleX);
			};
		});
	},
	updateClipPos : function( ev){
		if(this._cliper){
			this._cliper.setTop(this._cliper.top + ev.e.movementY);
			this._cliper.setLeft(this._cliper.left + ev.e.movementX);
		};
	},
	updateClipScale : function(ev){
		if(this._cliper){
			var sX = this._cliper.getScaleX() + ev.e.movementY * .05 ,
				sY = this._cliper.getScaleY() + ev.e.movementY * .05;
			this._cliper.setScaleX(sX);
			this._cliper.setScaleY(sY);
		};
	},
	toObject	: function(){
		return fabric.util.object.extend(this.callSuper('toObject'), {
			_cliper: this._cliper.toObject(),
		});
	},
});
fabric.ClipedImage.fromObject = function(object, callback) {
	fabric.util.loadImage(object.src, function(img) {
		var __cliper = new fabric.Path(object._cliper.path, object._cliper),
		//~ var __cliper = new fabric.Path(object._cliper.path),
			clipedObject = new App.fabric.ClipedImage(img, __cliper, object, true);
		callback && callback(clipedObject);
	}, null, object.crossOrigin);
};
fabric.ClipedImage.async = true;
fabric.DPI = 300;
module.exports 				= fabric;
