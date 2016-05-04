var Behavior = {
	ui		:	{
		deleteObject: ".trash",
		cloneObject	: ".copyContent",
		pasteStyle 	: '.pasteStyle',
		copyStyle 	: '.copyStyle',
		sendBackwards	: ".sendBack",
		bringForward: ".bringForward",
		opacity : ".opacity",
		stroke	: ".boxBorder",
		flipX	: ".flipX",
		flipY	: ".flipY",
		shadow 		: ".boxShadow",
		shadowOptions:	".options",
		
	},
	events 	:	{
		'click @ui.deleteObject' : 'deleteObject',
		'click @ui.cloneObject' : 'cloneObject',
		'click @ui.pasteStyle' : 'pasteStyle',
		'click @ui.copyStyle' : 'copyStyle',
		'click @ui.sendBackwards' : 'sendBackwards',
		'click @ui.bringForward' : 'bringForward',
		'input @ui.opacity' : 'setOpacity',
		
		'click @ui.stroke' 	: 'setStroke',
		'click @ui.flipX' : 'setFlipX',
		'click @ui.flipY' 	: 'setFlipY',			

		'click @ui.shadow' : 'setShadow',			
		'click @ui.shadowOptions' : 'toggleShadow'
	},
	deleteObject :function(){
	  App.canvas.remove(App.canvas.getActiveObject());
	},			
	cloneObject : function(){
		App.fabricToolsChannel.trigger('clipboard:clone');
	},
	copyStyle : function(){
		window._copyStyle = App.fabricToolsChannel.request('getActiveObject');
		
	}, 
	pasteStyle : function(){
		if(window._copyStyle){
			var s = App._.pick(window._copyStyle, 'shadow', "stroke", "strokeWidth", "fill");
			var obj = App.fabricToolsChannel.request('getActiveObject');
			obj = App._.extend(obj, s);
			this.view.model.set(obj);
			this.view.render();
			App.fabricToolsChannel.trigger('renderall');
		}
	}, 
	bringForward : function(){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		obj.bringToFront();
		App.fabricToolsChannel.trigger('renderall');
	}, 
	sendBackwards : function(){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		obj.sendBackwards();
		App.fabricToolsChannel.trigger('renderall');
	},
	setOpacity : function(ev){
		   App.fabricToolsChannel.trigger("object:opacity", parseFloat(ev.currentTarget.value));
			
	},
	setStroke : function (ev) {
			var obj = App.fabricToolsChannel.request('getActiveObject');
			if(obj.getStroke()){
				obj.setStroke(false);
			} else {
				obj.setStroke('rgba(0,0,0,1)');
				obj.setStrokeWidth(2);
			};
			App.fabricToolsChannel.trigger('renderall');
	},
	setFlipX : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		if(obj.getFlipX()){
			obj.setFlipX(false);			
		} else {
			obj.setFlipX(true);
		}
		App.fabricToolsChannel.trigger('renderall');
	},
	setFlipY : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		obj.set('flipY', !obj.getFlipY());
		App.fabricToolsChannel.trigger('renderall');
	},
	setShadow : function(ev){
		var obj = App.fabricToolsChannel.request('getActiveObject');
		if(!obj.getShadow()){
			
			obj.setShadow({
				color:	'rgba(0,0,0,.8)',
				offsetX : obj.width*0.05,
				offsetY : obj.height*0.05,
				blur	: obj.width*0.03
			});
		} else {
			obj.setShadow('');
		}
		
		App.fabricToolsChannel.trigger('renderall');
	},
	toggleShadow : function(){
		App.fabricToolsChannel.trigger("dialog:dropShadow");
	},
};
module.exports = App.Marionette.Behavior.extend(Behavior);
