var PageableCollection = require("backbone.paginator");
module.exports =  function(App){
	return PageableCollection.extend({
		url : '/lifebook/templates',
		mode : 'client',
		state: {
            pageSize: 9
        },
		model : App.models.template,
	});
}
