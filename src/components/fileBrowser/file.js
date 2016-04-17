module.exports = function(App){
var file = {
tagName : "img",
template : false,
modelEvents :{
	"change" : "render"
},
events : {
	"click" : "_click"
},
_click : function(ev){
	//~ if(this.model.get("state") === "draft" && this.model.get("state") !== "remote"  ){
	if(ev.shiftKey){
			this.model.drupalize();
	};
	if(ev.ctrlKey){
			this.model.destroy();
	};
	//~ if(!ev.shiftKey && !ev.ctrlKey) {
		//~ if( !this.model.get("_rev") ){
			//~ this.model.attach();
		//~ } else {
	if(!ev.shiftKey && !ev.ctrlKey) {
			//~ var model = this.model;
			//~ new Promise(function(resolve, reject){
				//~ resolve(App.fabricToolsChannel.request("files:output", model.id));
			//~ }).then(function(src){
		App.fabricToolsChannel.trigger("image:add" , this.model.refreshSrc());
			//~ });
			
		//~ };
	};
},
onRender  : function(){
	this.$el.attr(this._getAtributes());
	jQuery(this.el)
		.drag("start",function( ev, dd ){
			console.log(ev, dd);
				console.log(dd.drag.dataset.id);
				console.log(
				App.files.where({"_id" :dd.drag.dataset.id})
				);
		})
},
_getAtributes : function(){
	var extension 	= App._.last(this.model.get("filename").split('.')),
		state 		= this.model.get("state"),
		id 			= this.model.get("id") || this.model.get("_id"),
		src  		= this.model.get("src");

	return {
		class			: "item "+ state +" "+extension,
		"data-extension": extension,
		"data-id"		: id,
		title			: state,
		src				: src,
	};
}
};

return App.Marionette.ItemView.extend(file);
}
