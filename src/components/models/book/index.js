//~ App.testdata = require('./testdata.json');

var chapters =  require('./chapters/index.js'),
	doit = function(chapterId){
		var pages = App.chapters.get(chapterId).pages,
			compositions = pages.map(function(model){
				return model.composition;
			});
		App.pages.set(compositions);
		App.nprogress.done();
		
	};

App.fabricToolsChannel.on({
	"goto:chapter" : function(chapterId){
		if(!App._.isUndefined(App.chapters) && !App._.isUndefined(App.chapters.get(chapterId))){
			return ;
		}
		App.chapters =  new chapters;
		App.chapters.url = 	 "/testChapter/"+chapterId,
		App.chapters.fetch({
			success : function(){
				var pages = App.chapters.get(chapterId).pages,
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
	}
}, App.chapters)


