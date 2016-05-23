//~ var composition	= App.models.composition = require('./comp.js');
//~ var composition	= App.models.composition ;
	//~ d8model		= require('../../D8models/d8model.js');

var page = {
	idAttribute : "id",
	url			: function(){
		var format = '?_format=json';
		return this.isNew() ? 
			'/entity/pages' + format :
			'/lifebook/pages/' + this.id + '?_format=json';
	},
	parse: function(resp) {
		if(_.isUndefined(resp)) return;
		if(	!_.isUndefined(resp.compositions)&&resp.compositions.length){
			this.attachComposition(resp.compositions);
		};
		if(	!_.isUndefined(resp.page)){
			return this._fromExtendedJSON(resp.page);
		};
		return this._fromExtendedJSON(resp);
	},
	
	attachComposition : function(composition){
		var page = this;
		//TODO: multiple compostions per page (layers)
		this.composition = new App.models.composition(composition[0], {
			parse:true
		});
		if(this.composition.isNew()){
			this.composition.save({},{
				success : function(model){
					page.composition = model;
					page.save({
						"field_composition_ref" : [{
								target_id : model.id,
								target_type : "composition"	}]
					},{
						success : function(model){
							model.trigger("comp");
						}
					});
				}
			});
		};
	},
	initialize : function(){
		var keys = App._.keys(this.attributes);
		if(keys.length === 1 && keys[0] === "id"){
			this.fetch();				
		};
	},
	sync : function(method, model, options)  {
		options.beforeSend = function (xhr) {
			xhr.setRequestHeader('Content-type'	,'application/json');
			xhr.setRequestHeader('Accept'		,'application/json');
			xhr.setRequestHeader('X-CSRF-Token'	,App.csrfToken);
		};
		if (method === 'update') options.type = 'PATCH';
	//~Substute toJSON method . adapt to Drupal nested value style..
		var toJSON = this.toJSON;
		this.toJSON = this._toExtendedJSON;
		var ret = App.Backbone.sync.apply(this, arguments);
		this.toJSON = toJSON;
		return ret;
	},
	_fromExtendedJSON: function(resp) {
		resp = _.mapObject(resp, function(val, key) {
			if(_.isArray(val)){
				if( val.length ){
					if(!_.isUndefined(val[0].value)){
						return val[0].value;
					}
					if(!_.isUndefined(val[0].target_id)){
						return val;
					}
				}else {
					return "";
				}
			};
		});
		return resp;
	},
	_toExtendedJSON: function() {
		//~ var attrs = App._.pick(this.attributes, 'data', 'meta');
		var attrs = App._.omit(this.attributes, 'url', 'changed', 'created','uuid', 'user_id', 'status', 'langcode', 'target_id', 'target_id', 'target_type' ,'target_uuid');
		_.each(attrs, function(value, key) {
			attrs[key] = [{ 'value': value }];
		});
		if(this.attributes.field_composition_ref){
			attrs.field_composition_ref = this.attributes.field_composition_ref
		};
			
		return attrs; 
	},
}
//~ module.exports = d8model.extend(page);
module.exports = App.Backbone.Model.extend(page);

 
