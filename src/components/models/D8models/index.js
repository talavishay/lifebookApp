module.exports = function(App){
	return {
		file 	: require('./File.js')(App),
		template 	: require('./Template.js')(App),
		composition : require('./Composition.js')(App)
	}
}
