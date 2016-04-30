var view = {
	tagName : "img",
	template: false,
	attributes: function () {
		return this.model.attributes;
	},
	modelEvents: {
		"change:src": "showPreview",
	},
	events : {
		"click" : '_click'
	},
	showPreview 		: function(ev){
		this.$el.attr("src", this.model.get("src"));
			//~ this.generatePreview();
	},
	initialize : function(){
		this.listenTo(App.fabricToolsChannel,{
			"_updateMask" : this.showPreview
		}, this);
	},
	_click: function(){
		App.fabricToolsChannel.trigger("object:clip", this.model.get("mask"), .9,.9);
	},
	showPreview : function(){
		this.$el.attr("src", this.model.get("src") );
	},
	generatePreview : function(ev){
		var imageUrl= 	this.model.collection.currentImgPreviewThumb;
		if(imageUrl){
			var model 	= 	this.model;
			this.listenToOnce(model, "change:src", this.showPreview);
			App.fabricToolsChannel
					.request("worker:mask:img", imageUrl, this.model.get("src"))
					.then(function(result) {
						model.set("src", result);
				});
			}
	}
	//~ onAttach: function(){
		//~ var active = App.fabricToolsChannel.request('getActiveObject'),
			//~ model= this.model;

		//~ if(active){
			//~ imageUrl= 	active.getSrc();
			//~ if(imageUrl){
					//~ this.listenToOnce(model, "change:src", this.showPreview);
					//~ App.fabricToolsChannel
						//~ .request("worker:img:mask", imageUrl, model.get("src"))
						//~ .then(function(result) {
								//~ model.set("src", result);
						//~ });
				//~ }
		//~ }
	//~ }
};
module.exports =  App.Marionette.ItemView.extend(view);
