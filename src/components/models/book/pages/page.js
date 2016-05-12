var composition	= App.models.composition = require('./comp.js');
	//~ d8model		= require('../../D8models/d8model.js');

var page = {
	url		: function(){
		return '/lifebook/pages/' + this.id + '?_format=json';
	},
	parse: function(resp) {
		if(resp.field_composition_ref){
			this.composition = new composition(resp.field_composition_ref[0]);
			delete resp.field_composition_ref;
		};
		return this._fromExtendedJSON(resp);
	},
	initialize : function(options){
		if(App._.isUndefined(this.id) && !App._.isUndefined(options.target_id)){
			this.id = options.target_id;
			this.fetch();
		};
	},
	_sync : function(method, model, options)  {
		options.url = this.get("url") + '?_format=json';
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
		resp = App._.mapObject(resp, function(val, key) {
			if(val.length && !App._.isUndefined(val[0].value)){
				return val[0].value;
			} else {
				return val;
			};
		});
		return resp;
	}
}
//~ module.exports = d8model.extend(page);
module.exports = App.Backbone.Model.extend(page);

 
