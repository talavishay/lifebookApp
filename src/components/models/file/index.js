module.exports = function(App){
	return  {
		
			draft : require('./draft.js')(App),
		 	 
		//~ remote 	: require('./file/remote.js')(App),
	};
};
