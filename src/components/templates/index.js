var _templates = require('./templates')(App);
App.templates = new _templates;
App.templates.fetch({parse : true});
App.fabricToolsChannel.on({
	"template:add"		: App.templates.add,
	"template:delete"	: App.templates.remove
});

App.templates.addTemplate = function(data){
	App.nprogress.start();
//TODO: use caman for the preview..
		var meta = JSON.stringify({ 
			canvasModel : App.canvas._view.model.attributes,
			preview : App.canvas.toDataURL({
						format: 'png',
						multiplier: .1
					}),
		});
		
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
					url : '/entity/template',
					success : App.nprogress.done
				});
			},function(err){
				console.log(err);
			});
};
