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
	composition.prototype._toExtendedJSON = function() {
//~ //TODO: move "book preview componenet" ?7
		attrs = App._.omit(this.attributes, 'active', 'pageNumber', 'changed', 'created','uuid', 'user_id', 'status', 'langcode');
		//~ _.each(attrs, function(value, key) {
			//~ attrs[key] = [{ 'value': value }];
		//~ });
		//~ attrs.langcode = this.attributes.langcode;
		attrs.id = this.id;
		attrs.name = this.attributes.name;
		return attrs; 
	};
	return composition;
}
