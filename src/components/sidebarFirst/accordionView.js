//~ var COL = require('./collection.js');

module.exports = App.Marionette.CollectionView.extend({
	template : 			require('./template.html'),
	childViewContainer : '.content',
	childView : 		require('./view.js'),
	collection : 		new COL(),
	//~ collectionEvents : {
		//~ "change" : '_render'
	//~ },
    initialize : function(){
		//~ this.render();
		this.collection.fetch();
		//~ this.collection.create({selected:false});
	},
	_render : function(){
		this.render();
	},
    //~ blur: function() {
        //~ this.minimize();
        //~ this.model.set({ selected: false });
    //~ },
    //~ focus: function() {
        //~ if (this.model.get("selected") === true) { return; }
        //~ this.model.set({ selected: true });
        //~ this.maximize();
        //~ this.vent.trigger("AccordionView:SaveSelection", this.model.cid);
    //~ },
    //~ minimize: function() {
        //~ this.$el
			//~ .find(this.elContent)
			//~ .slideUp(this.slideUpSpeed);
    //~ },
    //~ maximize: function() {
        //~ this.$el
			//~ .find(this.elContent)
			//~ .slideDown(this.slideDownSpeed);
    //~ }
});
