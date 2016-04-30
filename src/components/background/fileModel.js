var model = {
	parse : function(response){
		var filename = response,
			url = this.url()+"/"+filename.trim();

		return {
			src 		: url,
		};	
	},
	defaults : {
		src :""
	},	
};
module.exports = App.Backbone.Model.extend(model);
