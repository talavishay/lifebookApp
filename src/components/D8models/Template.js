var _ = require('underscore');

module.exports = function(App){
	var template = require('./d8model.js')(App);
	template.prototype._type = 'template';
	_.extend(template.prototype.defaults, {
			type : "design",
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
	return template;
}
