module.exports = function(App){
	var composition = require('./d8model.js')(App);
	composition.prototype._type = 'composition';
	composition.prototype._root = 'lifebook';
	composition.prototype.idAttribute 	= 'id';
	//TODO: better nameing,,
	App._.extend(composition.prototype.defaults, {
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
	return composition;
}
