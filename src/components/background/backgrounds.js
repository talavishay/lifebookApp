var PageableCollection = require("backbone.paginator");	

module.exports =  PageableCollection.extend({
		url : '/src/background',
		mode : 'client',
		state: {
            pageSize: 9 
        },
		model : require('./fileModel'),
		parse : function(response){
			return  App._.filter(response, function(val){ 
				return (val.split('.')[1] === "png" || val.split('.')[1] === "jpg" || val.split('.')[1] === "jpeg" )
			});
		},
		
});
