var chapter = {
	idAttribute: "id",
	url		: function(){
		var format = '?_format=json';
		return isNaN(parseInt(this.id)) ? 
			'/entity/chapters' + format :
			'/lifebook/chapters/' + this.id + '?_format=json';
	},
	parse: function(resp) {
		if(	!App._.isUndefined(resp)){
			return this._fromExtendedJSON(resp);
		};
	},
	_fromExtendedJSON: function(resp) {
		resp = App._.mapObject(resp, function(val, key) {
			if(val.length && !App._.isUndefined(val[0].value)){
				return val[0].value;
			} else {
				return val;
			};
		});
		return resp;
	},
	_toExtendedJSON: function() {
		//~ var attrs = App._.pick(this.attributes, 'data', 'meta');
		var attrs = App._.omit(this.attributes, 'field_max_pages', 'name', 'url', 'id', 'changed', 'created','uuid', 'user_id', 'status', 'langcode', 'target_id', 'target_id', 'target_type' ,'target_uuid', 'field_pages_ref');
		
		App._.each(attrs, function(value, key) {
			attrs[key] = [{ 'value': value }];
		});
		if(this.attributes.field_pages_ref){
			attrs.field_pages_ref = this.attributes.field_pages_ref
		};
			
		//~ attrs.id = this.id;
		return attrs; 
	},
	sync		: function(method, model, options)  {
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
};
module.exports = App.Backbone.Model.extend(chapter);
