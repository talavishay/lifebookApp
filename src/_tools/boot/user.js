App.$.get('/rest/session/token')
	.done(function f(csrfToken){
	// Drupal8 rest POST/PATCHE/DELETE requirement
	App.csrfToken = 	csrfToken;
});
//TODO: move get token to edit mode..?
App.user.on("sync" , function(){
	App.$(document).ajaxError(this._reDirectOn403);
	App.bookChannel.trigger("user:chapters", App.user);
});
App.user._reDirectOn403 = function(event, xhr) {
	if(xhr.status === 403 && isNaN(parseInt(App.user.get("uid"))) ){
		window.location.href = '/user/login';
	};
};
App.user.fetch();
