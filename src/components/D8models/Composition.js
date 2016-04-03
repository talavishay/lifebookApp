var _ = require('underscore');

module.exports = function(App){
	var composition = require('./d8model.js')(App);
	composition.prototype._type = 'composition';
	_.extend(composition.prototype.defaults, {
			data :[{
				value: {
					objects:[],
					background : null
				}
			}],
			meta :[{
				value: {
					preview :"#", 
					size : {} 
				} 
			}],
	});
	//~ composition.prototype.sync = function(method, model, options)  {
		//~ options.beforeSend = function (xhr) {
			//~ xhr.setRequestHeader('Content-type', 'application/json');
			//~ xhr.setRequestHeader('Accept', 'application/json');
			//~ xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);
		//~ };
		//~ var id = model.id,
			//~ format = '?_format=json',
			//~ _url =  isNaN(parseInt(id)) ? '/entity/composition' + format : '/lifebook/composition/'+ id + format;
		//~ 
		//~ options.url = _url;
		//~ if (method === 'update') options.type = 'PATCH';
		//~ var ret = App.Backbone.sync.apply(this, arguments);
		//~ return ret;
	//~ };
	return composition;
}
