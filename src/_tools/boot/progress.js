App.nprogress = require('nprogress');
App.nprogress.configure({ showSpinner: false });
App.nprogress._onprogress = function(e)  {
  e.lengthComputable ?
    App.nprogress.set((Math.floor((e.loaded/e.total) * 100)) / 100):
    App.nprogress.inc();
};

App.$(document).on("ajaxStart", function(){
  App.nprogress.start();
}).on("ajaxSend", function(){
  App.nprogress.start();
}).on("ajaxStop", function(){
  App.nprogress.done();
}).on("ajaxComplete", function(){
  App.nprogress.done();
});
