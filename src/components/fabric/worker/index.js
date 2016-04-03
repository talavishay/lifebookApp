var fabric = App.fabric;


function maskImage(imageUrl, maskUrl){

	return new Promise(function(resolve, reject) {
		var canvas = new fabric.StaticCanvas('<canvas/>', {width: 50, height:50}),
			img = new Image();

		img.onload = function() {
		var fImg = new fabric.Image(this);
			//~ App.$.get(src).then(function(res){
				//~ res
			//~ });
			fabric.loadSVGFromURL(maskUrl, function(objects, options) {
				var mask = (objects.length > 1) ? new fabric.PathGroup(objects, options) : objects[0];
				mask.set({
					scaleY: (fImg.height / mask.height)*.9,
					scaleX: (fImg.width / mask.width)*.9,
					left: -((fImg.width/2)*.9),
					top	: -((fImg.height/2)*.9),
				});

				fImg.set({
					clipTo: function(ctx) {
						mask.render(ctx);
				}});
				resolve(URL.createObjectURL(App.dataURItoBlob(fImg.toDataURL())));
			});
		};
		img.src = imageUrl;
	});
};
App.fabricToolsChannel.reply( "worker:img:mask", function(imageUrl, maskUrl){
	return maskImage(imageUrl, maskUrl);
});
