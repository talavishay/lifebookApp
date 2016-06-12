App.Backbone.Radio.log = function( channelName, eventName ,args){
	App.log(!args ? eventName : args+' : '+eventName);
};
App.Backbone.Radio.tuneIn(true);

