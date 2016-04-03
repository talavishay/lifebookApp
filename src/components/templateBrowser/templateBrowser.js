var _filterByModel =  App.Backbone.Model.extend({
		defaults : {
			type : "design",
			pageType : "cover",
			category : "kids"
		}
});
module.exports = App.Marionette.CompositeView.extend({
	className : "fileBrowser templatesBrowser loader",
	template: require('./templates.html'),
	model : new _filterByModel,
	modelEvents : {
		"change" : "_filter"
	},
	childViewContainer: ".content",
	childView: require('./itemView.js'),
	//~ collection : App.templates,
	collectionEvents: {
		"sync": function(e){
			this.$el.removeClass("loader");
			//~ this._changeType();
		}
	},
	behaviors: [{ behaviorClass: require('../behaviors/toggle.js')},
				{ behaviorClass: require('../behaviors/pager.js')}],
	initialize : function(){
		//~ this.model.set({"type" : "design"});
		this.listenTo(App.templates, "sync", function(x){
			this._filter(this.model.get("type"));
		});
		//~ this.listenTo(App.fabricToolsChannel, "dialog:templates", this.$el.find('h3').click());
	},
	ui : {
		"type" : ".type",
		"pageType" : ".pageType",
		"category" : ".category",
	},
	events : {
		"click .new" : App.templates.addTemplate,
		"click .filter button" : "_update_type",
		"change select" : "_update",
	},

	_update_type : function(ev){
		this.model.set("type", App.$(ev.currentTarget).attr("name"));
	},
	_update : function(ev){
		this.model.set(App.Backbone.Syphon.serialize(this));
	},
	_filter : function(ev){
		this.collection =  new App.Backbone.Collection;
		var _filters = _.omit(this.model.attributes, function(value, key, object){ return _.isNull(value) });
		this.collection.reset(App.templates.where(_filters));
		this.render();
	}
});
