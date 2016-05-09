var comp = {
	initialize	: function(options){
		if(App._.isUndefined(this.id) && !App._.isUndefined(options.target_id)){
			this.id = options.target_id;
			this.fetch();
		};
	},
	url		: function(){
		return '/lifebook/composition/' + this.id + '?_format=json';
	},
	//~ constructor : function(options){
		//~ if(!App._.isNull(options) && App._.isUndefined(this.id) && !App._.isUndefined(options.target_id)){
			//~ this.id = options.target_id;
			//~ this.url = options.url;
			//~ this.fetch();
		//~ };
	//~ },
	sync		: function(method, model, options)  {
		//~ options.url = this.get("url") + '?_format=json';
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
	parse: function(resp) {
		if(resp.field_page_compotitions){
			this.composition = new composition(resp.field_page_compotitions[0]);
			//~ this.composition.set(resp.field_page_compotitions[0], {
				//~ parse: true,
				//~ remove: false
			//~ });
			delete resp.field_page_compotitions;
		};
		return this._fromExtendedJSON(resp);
	},
	_fromExtendedJSON: function(resp) {
		resp = App._.mapObject(resp, function(val, key) {
			if(!App._.isUndefined(val[0].value)){
				return val[0].value;
			} else {
				return val;
			};
		});
		return resp;
	}
}
module.exports = App.Backbone.Model.extend(comp);
