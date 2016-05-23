var comp = {
	idAttribute : "id",
	initialize	: function(options){
		if(	App._.isUndefined(this.id) &&
			!App._.isUndefined(options)&&
			!App._.isUndefined(options.target_id)){
			this.id = options.target_id;
			this.fetch();
		};
	},
	url		: function(){
		var format = '?_format=json';
			return isNaN(parseInt(this.id)) ? 
				'/entity/composition' + format :
				'/lifebook/composition/'+ this.id + format;
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
	parse: function(resp) {
		//~ if(resp.field_page_compotitions){
			//~ this.composition = new composition(resp.field_page_compotitions[0]);
			//~ this.composition.set(resp.field_page_compotitions[0], {
				//~ parse: true,
				//~ remove: false
			//~ });
			//~ delete resp.field_page_compotitions;
		//~ };
		return this._fromExtendedJSON(resp);
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
		var attrs = App._.omit(this.attributes, 'url', 'changed', 'created','uuid', 'user_id', 'status', 'langcode', 'target_id', 'target_id', 'target_type' ,'target_uuid');
		_.each(attrs, function(value, key) {
			attrs[key] = [{ 'value': value }];
		});
		attrs.id = this.id;
		attrs.name = this.attributes.name;
		return attrs; 
	},
	defaults :  {
		name : "name",
		data :'{"objects":[],"background" : null}',
		meta :'{"preview":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABVCAIAAAHtYiAhAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+AFCg8RBswrHy4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAgUlEQVRo3u3XQQqFMAxAwST3v3O8QLsoqBiZLDU8hvo/YnZ3rKZiM7+/kcsjqYPItKu5+xGcHZztcduevG3b/vM3TcVjIy0tLS0tPTLttSstLS0tLS0tLS0tLS0t/Y0P6ZHnAQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDf3eXKN0FicG67qgAAAAAElFTkSuQmCC"}',
	}
};
module.exports = App.Backbone.Model.extend(comp);
