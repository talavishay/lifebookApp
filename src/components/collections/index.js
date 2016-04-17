module.exports = function(App){
	return {
		files	: require('./files.js')(App),
		canvasImages	: require('./canvasImages.js')(App),
	};
};
