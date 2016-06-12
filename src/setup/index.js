App.toolsChannel.reply({
	"GridView" : function(collection ){
		App.toolsChannel.request("autosave", collection);
		App.toolsChannel.trigger("dialog:grid" , new App.backgrid.Grid({
			collection : collection,
			columns : [{
				name	: "name",
				label	: "Name",
				cell	: "string" 	}]
			}));
	},
	
	"GridView:chapters"			: 	function(collection){
		App.toolsChannel.request("autosave", collection);
		App.toolsChannel.trigger("dialog:grid" , new App.backgrid.Grid({
			collection : collection,
			columns : [{
				  name	: "name",
				  label	: "Name",
				  cell	: "string" 
				},{
				  name	: "field_max_pages",
				  label	: "max pages",
				  cell	: "string" 
				}]
		}));
	},
	"GridView:pageObjects"		: 	function(collection){
		App.toolsChannel.request("autosave", collection);
		App.toolsChannel.trigger("dialog:grid" , new App.backgrid.Grid({
			collection : collection,
			columns : [{
				name	: "name",
				label	: "name",
				cell	: "string",	//default ? 
			},{
				name	: "field_last_name",
				label	: "Last name",
				cell	: "string",	//default ? 
			},{
				name	: "field_text",
				label	: "text",
				cell	: "string",	//default ? 
			}],
		}));
	},
	
	"GridView:files"		: 	function(collection){
		App.toolsChannel.request("autosave", collection);
		App.toolsChannel.trigger("dialog:grid" , new App.backgrid.Grid({
			collection : collection,
			columns : [{
				name	: "fid",
				label	: "file id",
				cell	: "string",	//default ? 
				editable : false
			},{
				name	: "name",
				label	: "name",
				cell	: "string",	//default ? 
			}],
		}));
	},
	
	"autosave" : function(collection ){
		collection.each(function(model){
			model.on("change", function (model, options) {
				if ((options && options.save === false) ) return;
				  model.save();
			});
		});
	},
});

