var _m = require('./model');

App.fabricHistory = new _m({page : []});
App.fabricHistory.timer = window.setInterval(function(){
	App.fabricHistory.save();
}, 1000);
App.fabricToolsChannel.on("fabricHistory:undo", function(){
	//get page history
	var stack = App.fabricHistory.get("page");
	//save & remove last step .. LOL
	App.fabricHistory.set("undone", stack.pop());
	// load current last step.. undo done
	App.canvas.loadFromJSON(stack[stack.length-1], function(){
        App.canvas.renderAll();
    });
});
App.fabricToolsChannel.on("fabricHistory:redo", function(){
	var undone = App.fabricHistory.get("undone");
	App.canvas.loadFromJSON(undone, function(){
        App.canvas.renderAll();
    });
});

App.fabricToolsChannel.on("fabricHistory:save", function(int){
	App.fabricHistory.save();
});

App.fabricHistory.save = function(){
	var stack = App.fabricHistory.get("page"),
		last = stack[stack.length-1],
		current = JSON.stringify(App.canvas.toJSON());

	if(!stack.length || (App.objectHash(current) != App.objectHash(last))){
		stack.push(current);
		App.fabricHistory.set("page", stack);

		App.fabricToolsChannel.trigger("@saving");
	};
};
