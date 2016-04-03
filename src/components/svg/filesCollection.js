var Backbone = App.Backbone,
	PageableCollection = require("backbone.paginator");
var cacheControl = new App.Backbone.Hoard.Control();
module.exports =  PageableCollection.extend({
		url : function(){
			return App.svg.collectionUrl;
		},
		
		sync: cacheControl.getModelSync(),
		mode : 'client',
		state: {
            pageSize: 9
        },
		model : require('./fileModel'),
		parse : function(response){
			//~ var col = this,
				//~ root = App.dirModel.get("root");
			//~ App.dirModel.save({
				//~ "dirs" : App._.filter(response, function(val){ 
							//~ return val.split('.').length === 1 ;
						//~ }),
			//~ });
			//~ if(root == ""){
				//~ App.dirModel.save({"root": this.url});
			//~ }
			//~ 
			//~ 
			//~ return  App._.filter(response, function(val){ 
				//~ return val.split('.')[1] === "svg" ;
				//~ }
			//~ );
			
			App.fabricToolsChannel.trigger("dialog:svg:dirs", response.dirs);
			
			return response.files;
		}
});
