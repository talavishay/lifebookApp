module.exports = function(App){
	return App.Backbone.Model.extend({
//~ App.D8Entity = App.Backbone.Model.extend({
	defaults : {
		name : "new",
	},
	idAttribute : "id",
	initialize : function(){
		//~ this.on("change:name", this._updateDb, this);
	},
	parse: function(resp, options) {
		//~ resp = this.fromExtendedJSON(resp);
		var location = options.xhr.getResponseHeader("location");
		if(location){
			// Drupal doesnt return the entity in the body (rest defaults)
			// instead a location link header is providing a url ...
			// location = http://blabla.com/bla/bla/{new entity id}
			//~ extract entity id and set it
			var s = location.split('/');
			this.set("id" ,s[s.length-1]);
		};
		return this.fromExtendedJSON(resp);
	},
	fromExtendedJSON: function(resp) {
		var id = this.idAttribute;
		if (!_.isNull(resp) && !_.isUndefined(resp) ) {
			_.each(resp, function(value, key) {
				if (_.isString(key) && key.charAt(0) != '_') {
					if (_.isArray(value)) {
						resp[key == 'nid' ? id : key] = value[0].value;
					}
				}
			});
		}
		return resp;
	},
	toExtendedJSON: function() {
		var attrs = this.attributes ,id = this.idAttribute;
		_.each(attrs, function(value, key) {
		  if (_.isString(key) && key.charAt(0) != '_') {
			attrs[key == id ? 'nid' : key] = [{ 'value': value }];
		  }
		});
		return attrs;
	},
	sync:function(method, model, options)  {
		options.beforeSend = function (xhr) {
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);
		};

		// Substute toJSON method when performing synchronization.
		// adapt to Drupal nested value style..
		var toJSON = this.toJSON;
		this.toJSON = this.toExtendedJSON;
		// Drupal uses PATCH instead of PUT (App.Backbone default)
		if (method === 'update') options.type = 'PATCH';
		var ret = App.Backbone.sync.apply(this, arguments);
		// back to the App.Backbone..
		//TODO: remove ??? is this required?   
		this.toJSON = toJSON;
		return ret;
	},
    save: function(attrs, options) {
        options || (options = {});
        attrs || (attrs = _.clone(this.attributes));
	
        // Filter the drupal/cms data 
        delete attrs.created;
        delete attrs.changed;
        delete attrs.uuid;
        //~ delete attrs.id;
        delete attrs.user_id;
        
        delete attrs.active;
        delete attrs.pageNumber;
        delete attrs.preview;
        

        options.data = JSON.stringify(attrs);

        // Proxy the call to the original save function
        return App.Backbone.Model.prototype.save.call(this, attrs, options);
    },
    _updateDb : _.debounce(function(ev){
		this.save();	
		console.log("saved @ name => " + this.get("name"));		
	},2000),	
});
};
