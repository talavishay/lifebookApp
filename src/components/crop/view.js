var view = {
	className 	: "crop",
	template	: require('./template.html'),
	model		: App.crop.model,
	initialize 	: function(options){
		this.listenTo(App.crop.model, {
			'change:croped' : this.preview,
		}, this);
		App.crop.model._setup();
	},
	events : {
		"click .save" : "triggerAddImage",
		"click .preview" : "crop",
	},
	triggerAddImage : function(){
		App.files.add(App.crop.file);
		App.fabricToolsChannel.trigger("image:add", App.crop.model.get("croped"));
	},
	preview : function(e){
			this.$el.find("img.croped").attr("src", App.crop.model.get("croped"));
	},
	onAttach : function(options){
		var width = this.$el.width(), height = 300;
		options = {
			boxWidth	: width,
			boxHeight	: height,
			//TODO: this init coords should be coming from the model defaults 
			setSelect	:   [ width/10, height/4, width*.8, height/2 ],
			onSelect	: App.crop.init
		};
		this.$el.find("img.org").Jcrop(options);
	},
};
module.exports = App.Marionette.ItemView.extend(view);
