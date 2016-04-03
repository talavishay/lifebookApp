var _templates = require('./templates')(App);
App.templates = new _templates;
App.templates.fetch();
App.fabricToolsChannel.on({
		"template:add"		: App.templates.add,
		"template:delete"	: App.templates.remove
});

App.templates.addTemplate = function(data){
	App.templates.invoke('set', {"active": false});
	var _preview = 	App.canvas.toDataURL({
						format: 'png',
						multiplier: .1
		}),
		data = {
			pageNumber : App.pages.length,
			active : false,
			data	:  JSON.stringify(App.canvas.toJSON()) ,
			meta	:  JSON.stringify({ preview : _preview })  ,
			type 	: data.type,
			pageType : data.pageType,
			category : data.category,
		};
	
	App.templates.create(data,{
		url : '/entity/template'
	});
};
App.templates.removePage = function(){
	App.templates.findWhere({"active":true}).destroy();
};
