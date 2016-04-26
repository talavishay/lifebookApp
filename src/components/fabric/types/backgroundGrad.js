module.exports = {
	type: 'BackgroundGrad',
	//~ async : false,
	initialize: function( options ) {
		options || (options = {});
		this.callSuper('initialize', options);
		this.set({
			"name" : options.name,
			
		});
		//~ this.hasBorders = false;
		//~ this.hasControls = false;
		this.selectable = false;
		//~ this.evented = false;
		this.evented = false;
	},
	toObject	: function(){
		return fabric.util.object.extend(this.callSuper('toObject'), {
			name: this.get("name")
		});
	},
	
};
