var Marionette = App.Marionette;

module.exports = Marionette.Behavior.extend({
	onRender: function(){
		// init Color picekr -- spectrum
		this.$el.find("input").spectrum({	
				preferredFormat: "hex",
				showInitial: true,
				//~ showAlpha: true,
				//~ showButtons: false	
		});
		
		App._.bindAll(this,'setColorStops');
	},
	events  : {
		"change #colorPickers input" : "setColorStops",
		"click .toggleGradMode" : "toggleGradMode",
		"click #dirPickers span" : "setType",
		"click #dirPickers" : 'triggerSetBackgroundGrad',
		//~ "change .first" : 'triggerSetBackgroundColor',
		//~ "change .last" : 'triggerSetBackgroundGrad',	
	},
	modelEvents : {
		'change:gradMode change:colorStops' : '_render'
	},
	_render : function(){
		this.view.render();
	},
	toggleGradMode : function(){
		this.view.model.save("gradMode", !this.view.model.get("gradMode"));	
	},
	
	triggerSetBackgroundGrad : function(){
		App.fabricToolsChannel.trigger("set:backgroundGrad", this.view.model.toJSON() );
	},
	triggerSetBackgroundColor : function(){
		App.fabricToolsChannel.trigger("set:backgroundColor", this.view.model.get("colorStops")["0"] );
	},
	setColorStops : function(ev){
		this.view.model.save("colorStops", {
			"0" : this.view.$el.find(".first").val(),
			"1" : this.view.$el.find(".last").val(),
		});
	},
	setType : function(ev){
		this.view.model.save({
			"dir": 	App.$(ev.currentTarget).data("dir"),
			"type": App.$(ev.currentTarget).data("type")
		});
	},
});
