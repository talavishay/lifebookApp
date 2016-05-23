var view = {
	tagName : "div",
	className : "page",
	template : require('./page.html'),
	//~ model : require ('./page.js'),
	modelEvents : {
		"change:meta" : "render",
		"change:active" : "render",
	},
	//~ collectionEvents: {
		//~ "all": "render"
	//~ },
	onRender : function(){
		this.$el.find(".pageNumber").text(App.pages.indexOf(this.model)+1);
	},
	events : {
		"click .moveUp" :"movePageUp",
		"click .moveDown" :"movePageDown",
		//~ "click .moveDown" :"_prev",
		'click [data-active="false"]'	: "_click",
		'click [data-active="true"]'	: "_save",
		
		
	},
	movePageUp: function(){
		App.pages.moveUp(this.model);
	},
	movePageDown: function(){
		App.pages.moveDown(this.model);
		
	},
	_click: function(ev){
		if(ev.shiftKey){
			this._save();
		};
		if(ev.ctrlKey){
			this.model.destroy();
		} else {
			App.nprogress.start();
			App.fabricToolsChannel.trigger("object:background:remove");
			App.canvas.clear();
			App.resolver
				.initialize(JSON.parse(this.model.get("data")))
				.then(function(stage){
					App.canvas.loadFromJSON(stage, App.canvas.renderAll.bind(App.canvas));
					App.nprogress.done();
				});			
			
		}
	},
	_save : function(){
		var id = this.model.id,
			format = '?_format=json',
			_url =  isNaN(parseInt(id)) ? '/entity/composition' + format : '/lifebook/composition/'+ id + format;
			
		this.model.save({
			
			"data"		: JSON.stringify(App.canvas.toJSON()),
			"meta"	: JSON.stringify({ preview : App.canvas.toDataURL({
						format: 'png',
						multiplier: .1})
					})
			},{
			url : _url
		});
	},
});
