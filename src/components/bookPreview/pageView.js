module.exports = App.Marionette.ItemView.extend({
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
		'click [data-active="false"]'	: "goToPage",
		'click [data-active="true"]'	: "_save",
		
		
	},
	movePageUp: function(){
		App.pages.moveUp(this.model);
	},
	movePageDown: function(){
		App.pages.moveDown(this.model);
		
	},
	goToPage: function(ev){
		if(ev.ctrlKey){
			this.model.destroy();
		} else {
			
			App.fabricToolsChannel.trigger("object:background:remove");
			var data = this.model.get("data");
			if(typeof data === "object"){
				data = data[0].value;
			}
			App.canvas.loadFromJSON(data, App.canvas.renderAll.bind(App.canvas));
			this.model.collection.invoke('set', {"active": false});		
			this.model.set({"active": true});		
		}
	},
	_save : function(){
		//~ console.log(JSON.parse(this.model.get("data")).objects);
		var id = this.model.id,
			format = '?_format=json',
			_url =  isNaN(parseInt(id)) ? '/entity/composition' + format : '/lifebook/composition/'+ id + format;
			
		this.model.save({
			"active" : false,
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
