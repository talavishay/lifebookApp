var _pages = require('./pages')(App);
App.pages = new _pages;

App.fabricToolsChannel.on({
		"page:add"		: App.pages.add,
		"page:delete"	: App.pages.remove
});

App.pages.addPage = function(){
	App.pages.invoke('set', {"active": false});
	var _preview = 	App.canvas.toDataURL({
						format: 'png',
						multiplier: .1
		}),
		meta = JSON.stringify({ preview : _preview });
	App.resolver
		.initialize()
		.then(function(stage){
			App.pages.create({
				data : JSON.stringify(stage),
				meta :	meta
			},{
				url : '/entity/composition'
			});
		});

	//clear canvas by loading an empty canvas..
	//~ App.canvas.loadFromJSON(App.pages.first().defaults.data, App.canvas.renderAll.bind(App.canvas));
	App.fabricToolsChannel.trigger("object:background:remove");
	App.canvas.clear();
};

App.pages.removePage = function(){
	var active = App.pages.findWhere({"active":true}),
		next =	App.pages.at(App.pages.indexOf(active) + 1);
	
	active.destroy();
	if(typeof next === "undefined"){
		App.pages.loadLastPage();
	} else {
		next.set({"active" : true});
		App.canvas.loadFromJSON(next.get("data")[0].value, App.canvas.renderAll.bind(App.canvas));
		
	}
	
	
};
//~ App.pages.moveUp = function(model) { // I see move up as the -1
  //~ var index = this.indexOf(model);
  //~ if (index > 0) {
    //~ this.remove(model, {silent: true}); // silence this to stop excess event triggers
    //~ this.add(model, {at: index-1});
  //~ }
//~ };
//~ 
//~ App.pages.moveDown = function(model) { // I see move up as the -1
  //~ var index = this.indexOf(model);
  //~ if (index < this.models.length) {
    //~ this.remove(model, {silent: true}); // silence this to stop excess event triggers
    //~ this.add(model, {at: index+1});
  //~ }
//~ };
 App.pages.moveUp = function(model) {
  var index = this.indexOf(model);
  if (index > 0){
    App.pages.swap(index, index-1);
  }
},

App.pages.moveDown =  function(model) {
  var index = this.indexOf(model);

  if (index < this.models.length) {
    App.pages.swap(index, index+1);
  }
},

App.pages.swap = function (indexA, indexB) {
  this.models[indexA] = this.models.splice(indexB, 1, this.models[indexA])[0];
  this.trigger("sort");
  App.chapter.compositions.reset(this.models);
  App.bookChannel.trigger("chapter:sort", App.chapter, this);
};
//~ App.pages.loadFirtPage = function(){
	//~ App.canvas.loadFromJSON(App.pages.first().get("data")[0].value, App.canvas.renderAll.bind(App.canvas));
	//~ App.pages.first().set({"active" : true});
//~ };
//~ App.pages.loadLastPage = function(){
	//~ App.canvas.loadFromJSON(App.pages.last().get("data")[0].value, App.canvas.renderAll.bind(App.canvas));
	//~ App.pages.last().set({"active" : true});
//~ };
