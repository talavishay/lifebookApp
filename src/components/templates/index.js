var _templates = require('./templates')(App);
App.templates = new _templates;
App.templates.fetch({parse : true});
App.fabricToolsChannel.on({
		"template:add"		: App.templates.add,
		"template:delete"	: App.templates.remove
});

App.templates.addTemplate = function(data){
	App.templates.invoke('set', {"active": false});
//TODO: use caman for the preview..
	var _preview = 	App.canvas.toDataURL({
						format: 'png',
						multiplier: .1
		}),
		meta = JSON.stringify({ preview : _preview });
		
		data = {
			meta	:	meta ,
			type 	:	data.type,
			pageType:	data.pageType,
			category:	data.category,
		};
		App.resolver
				.initialize()
				.then(function(stage){
					data.data = JSON.stringify(stage);
					App.templates.create(data,{
						url : '/entity/template'
					});
				},function(err){
					console.log(err);
				});
};
App.templates.removePage = function(){
	App.templates.findWhere({"active":true}).destroy();
};
