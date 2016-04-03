var _om = require('./objectModel'),
	_pm = require('./pageModel');

App.clipboard = {
	object : new _om,
	page : new _pm
};
App.clipboard.object.fetch();
App.clipboard.page.fetch();

App.fabricToolsChannel.on("clipboard:copy", function(){
	App.clipboard.copyObject();
	
});
App.fabricToolsChannel.on("clipboard:paste", function(){
	App.clipboard.pasteObject();
});

App.fabricToolsChannel.on("clipboard:clone", function(){
		App.clipboard.copyObject();
		App.clipboard.pasteObject(10);
		
});

App.fabricToolsChannel.on("clipboard:page:copy", function(){
		App.clipboard.copyPage();
		
});
App.fabricToolsChannel.on("clipboard:page:cut", function(){
		App.clipboard.copyPage();
		App.fabricToolsChannel.trigger("object:background:remove");
	
		
});
App.fabricToolsChannel.on("clipboard:page:paste", function(){
		App.clipboard.pastePage();
});
App.clipboard.copyPage= function(int){
	this.page.save("data",  JSON.stringify(App.canvas.toJSON()));
};
App.clipboard.pastePage= function(int){
    App.canvas.loadFromJSON(this.page.get("data"), function(){
        App.canvas.renderAll();
    });
};
App.clipboard.copyObject = function(int){
	App.clipboard.object.save("data" , App.fabricToolsChannel.request('getActiveObject').toObject());
};
App.clipboard.pasteObject = function(int){
	//TODO: object out of canvas test..
	var	obj = this.object.get("data");
	if(typeof int === "number"){
		obj.top = obj.top + int;
	};
	fabric.util.enlivenObjects([obj], function(objects) {
		objects.forEach(function(o) {
			App.canvas.add(o);
		});
	});
	App.fabricToolsChannel.trigger('renderall');
};
