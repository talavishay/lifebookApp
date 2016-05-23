module.exports = {
	type: 'pageObject',
	initialize: function( element,  options, fromObject ) {
		options || (options = {});
		this._events();
		element
		this.callSuper('initialize', element, options);
		this.pageObjectId = options.pageObjectId;
	},
	_events		: function(){
		this.on("removed", function(ev, b){
			App.bookChannel.trigger("pageObject:remove:page", this.pageObjectId );
			console.log("removing student" + "| id : " + this.pageObjectId);
			
		});
		this.on("added", function(ev, b){
			App.bookChannel.trigger("pageObject:add:page", this.pageObjectId );
			console.log("adding student" + "| id : " + this.pageObjectId);
		});
		
	},
	toObject	: function(){
		return fabric.util.object.extend(this.callSuper('toObject'), {
			pageObjectId: this.pageObjectId,
		});
	},
};
