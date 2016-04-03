module.exports = function(App){
	return {
		template 	: require('./Template.js')(App),
		composition : require('./Composition.js')(App)
	}
}
