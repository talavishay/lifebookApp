module.exports = function(App){
	var template = require('./d8model.js')(App);
	template.prototype._type = 'template';
	template.prototype._root = 'lifebook';
	template.prototype.idAttribute 	= 'id';
	App._.extend(template.prototype.defaults, {
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
