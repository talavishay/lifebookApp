module.exports = {
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
		if(_cliper.new && this.getWidth() > App.canvas.getWidth()){
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
};
