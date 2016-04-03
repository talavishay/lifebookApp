var	Marionette = App.Marionette;

var _m = App.Backbone.Model.extend({
		localStorage: new App.Backbone.LocalStorage("backgroundEdit"), // Unique name within your app.
		initialize:function(){
			this.fetch();
		},
		defaults : {
			id:"GradientOptionsbackgroundEdit",
		},
});

var view = Marionette.ItemView.extend({
	behaviors	: [
		{ behaviorClass: require('../behaviors/toggle.js')},
		{ behaviorClass: require('../behaviors/DropFiles.js')},
	],
	className 	: "backgroundEdit",
	template	: require('./filesCompositeView.html'),
	model 		: new _m,
	modelEvents : {
		'change' : 'render'//this.render..
	},
	onAttach: function(){
		this._initJCrop();
	},
	_initJCrop : function(){
		var img = this.$el.find(".image img");	
		img.Jcrop(	{
				bgColor: 'black',
				//~ setSelect:   [ x, y, width, height ],
				setSelect:   [ img.width()/10, img.height()/4, img.width()*.8, img.height()/2 ],
				onChange : function(){
					console.log(this);
				}
		});
	},
	
	
	
});
module.exports = view;
