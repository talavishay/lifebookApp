module.exports = function(App){
var _model = {
	parse		: function(resp, options) {
		return this._fromExtendedJSON(resp);
	},
	_fromExtendedJSON: function(resp) {
		var id = this.idAttribute;
		if (!_.isNull(resp) && !_.isUndefined(resp) ) {
			_.each(resp, function(value, key) {
				if( _.isString(key) && _.isArray(value) && typeof value[0] != "undefined"){
					if(typeof value[0].value != "undefined"){
						resp[key == 'nid' ? id : key] = value[0].value;
					}
					if(typeof value[0].target_id != "undefined"){
						resp[key == 'nid' ? id : key] = value[0].target_id;
					}
				}
			});
		}
		return resp;
	},
	_toExtendedJSON: function() {
		var attrs = this.attributes ,id = this.idAttribute;
		_.each(attrs, function(value, key) {
		  if (_.isString(key) && key.charAt(0) != '_') {
			attrs[key == id ? 'nid' : key] = [{ 'value': value }];
		  }
		});
		return attrs;
	},
	sync		: function(method, model, options)  {
		options.beforeSend = function (xhr) {
//TODO: is this required? whats the default ?
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.setRequestHeader('Accept', 'application/json');
//TODO: this is not always needed.. filter by method and apply
			xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);
		};
		var id = model.id,		//~ var id = model.get("id"),
			format = '?_format=json',
			_url =  isNaN(parseInt(id)) ? 
//~ drupal REST does an excellnt job for GET.. id is valid so lets get it. got it ? 
				'/entity/'+this._type + format :
//~ custom REST resource for our custom entities
				'/'+this._root+'/'+this._type+'/'+ id + format;

		options.url = _url;
//~ switch update method from default the PUT..adapt to Drupal..
		if (method === 'update') options.type = 'PATCH';
//~Substute toJSON method . adapt to Drupal nested value style..
		var toJSON = this.toJSON;
		this.toJSON = this._toExtendedJSON;
		var ret = App.Backbone.sync.apply(this, arguments);
//~TODO: remove ??? is this required? //~back to the App.Backbone..
		this.toJSON = toJSON;
		return ret;
	},
   
};
return App.Backbone.Model.extend(_model);
};
