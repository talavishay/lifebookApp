var user = {
	url		:	'/lifebook/user?_format=json',
	parse : function(resp){
		return this._fromExtendedJSON(resp[0]) ;
	},
	defaults : {
		name : "anonymous",
		field_mychapters : 0
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
};
module.exports = App.Backbone.Model.extend(user);
