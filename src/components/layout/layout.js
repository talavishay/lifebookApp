module.exports = App.Marionette.LayoutView.extend({
    el : 'body',
    template:  require('./layout.html'),
    regions: {
        fabric: '#fabric-region',
        topToolbar: '#topToolbar',
        toolbar: '#toolbar',
        sidebarFirst: '#sidebarFirst',
        sidebarSeconed: '#sidebarSeconed',
        bookPreview: '#bookPreview',
        dialogs : "#dialogs"
    },

    initialize: function() {
		
        this.listenTo(App.layoutChannel,{
			'set:content' 		: (view)=> {this.fabric.show(new view)},
			'set:toolbar' 		: (view)=> {this.toolbar.show(new view)},
			'set:sidebarSeconed': (view)=> {this.sidebarSeconed.show(new view)},
			'set:sidebarFirst'	: (view)=> {this.sidebarFirst.show(new view)},
			'set:topToolbar'	: (view)=> {this.topToolbar.show(new view)},
			//~ 'set:bookPreview'	: (view)=> {this.bookPreview.show(new view)},
			'set:dialogs'		: (view)=> {this.dialogs.show(new view)}
		}, this);
    },
    onBeforeDestroy: function() {
        Radio.reset('layout');
    }
});
