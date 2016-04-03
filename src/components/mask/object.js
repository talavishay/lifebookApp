module.exports = {

	_click: function(){
		App.fabricToolsChannel.trigger("object:clip", this.model.get("orgMask"), .9,.9);
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
};
