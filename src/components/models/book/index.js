//~ App.testdata = require('./testdata.json');

var chapters =  require('./chapters/index.js'),
	chapter =  require('./chapters/chapter.js'),
	//~ doit = function(chapterId){
		//~ var pages = App.chapter.get(chapterId).pages,
			//~ compositions = pages.map(function(model){
				//~ return model.composition;
			//~ });
		//~ App.pages.set(compositions);
		//~ App.nprogress.done();
		
	//~ };
	doit = function(model){
		var compositions = model.pages.map(function(model){
				return model.composition;
		});
		App.pages.reset(compositions);
		App.nprogress.done();
		
	};
App.chapters =  new chapters;
App.bookChannel.on({
	"user:chapters" : function(user){
		App._.each(user.get("field_mychapters"), function(item){
			item.id = item.target_id;
			var _c =  new chapter(item);
			_c.url = item.url+"?_format=json";
			_c.fetch({
				success : function(chpater, response, options){
					var pages = chpater.pages,
						_doit = App._.after(pages.length, doit);
					
					pages.each(function(item){
						item.on("sync" , function(page){
							App.nprogress.inc();
							page.composition.on("sync" , function(model){
								App.nprogress.inc();
								_doit(chpater);
							});
						});	
					});
				}
			});
			App.chapters.add(_c);
		});
	},
	
	"goto:chapter" : function(chapterId){
		var _chapter = App.chapter.get(chapterId);
		if(!App._.isUndefined(App.chapter) && !App._.isUndefined(_chapter)){
			doit(_chapter);
			return ;
		}
		
		App.chapter.url = 	 "/lifebook/chapters/"+chapterId+"?_format=json",
		App.chapter.fetch({
			success : function(){
				var pages = App.chapter.get(chapterId).pages,
					_doit = App._.after(pages.length, doit);
				
				pages.each(function(model){
					model.on("sync" , function(model){
						App.nprogress.inc();
						model.composition.on("sync" , function(model){
							App.nprogress.inc();
							_doit(chapterId);
						});
					});	
				});
			}
		});
	},
	
}, App.chapter)


