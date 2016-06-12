App.nprogress.configure({ showSpinner: false });
App.nprogress._onprogress = function(e)  {
	e.lengthComputable ?
		App.nprogress.set((Math.floor((e.loaded/e.total) * 100)) / 100):
		App.nprogress.inc();
};
App.nprogress.start();
App.$(document).bind("ajaxSend", function(){
	App.nprogress.start();
}).bind("ajaxComplete", function(){
	App.nprogress.inc();
});
