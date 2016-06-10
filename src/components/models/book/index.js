App.bookChannel.on({
	"user:chapters" : function(user){
		App._.each(user.get("field_mychapters"), function(item){
			var _c =  new App.chapterResources({id : item.target_id});
			_c.fetch();
		});
	},
	"init:chapter" : function(data){
		var chapter =  new App.models.chapter(data.get("chapter"), {
			 parse : true 
		});
		App.chapter = chapter;
		chapter.pages = new App.collections.pages(data.get("pages"), {
			parse	: true,
		});
		App.Book.chapters.add(chapter);

		var compositions = chapter.pages.map(function(model){
			model.composition.refPage = model;
			return model.composition;
		});
		App.pages.reset(compositions);
		App.chapter.compositions = App.pages.clone();
		
		chapter.pageObjects = new App.collections.pageObjects(data.get("pageObjects"), {
			parse	: true,
		});
		App.fabricToolsChannel.trigger("pageObjects:reset", chapter.pageObjects);
		
		
		//TODO: loading first page as default ??
		App.fabricToolsChannel.trigger("set:stage" 	,App.pages.first());
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
	"user:chaptersxxxx" : function(user){
		var doit = function(model){
			var compositions = model.pages.map(function(model){
					return model.composition;
			});
			
			App.pages.reset(compositions);
			App.chapter = model;
			App.chapter.compositions = App.pages.clone();
			App.nprogress.done();
			
		};

		App._.each(user.get("field_mychapters"), function(item){
			var _c =  new App.models.chapter({ id : item.target_id});
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
	
}, App.chapter)


