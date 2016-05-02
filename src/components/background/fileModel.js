var model = {
	parse : function(response){
		return {
			src 	: response.field_background_images,
			org 	: response.field_background_images_1
		};	
	},
	defaults : {
		src :"",
		org : ""
	},	
};
module.exports = App.Backbone.Model.extend(model);
