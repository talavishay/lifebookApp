window = {$:{event:{}}};
document = {};
importScripts("/modules/custom/app/js/node_modules/jimp/browser/lib/jimp.min.js");
//~ importScripts("/dist/index.js");

self.addEventListener('message', function(e) {
      //~ new  PouchDB('imagedialogModel').then(function (db) { 
							//~ self.postMessage({ data: db});
			//~ return db.info()
		  //~ }).then(function(x){
							//~ self.postMessage({ data: x});
		//~ });
      
      
      Jimp.read(e.data).then(function(image){
            var originalMime = image._originalMime,
            targetMimeType = originalMime || Jimp.MIME_JPEG;
        
        image
            .containCropped(50, 100)
            .getBuffer(targetMimeType,function(mime,data){
                 var dataUri = "data:" + targetMimeType + ";base64,"  + data.toString('base64');
                 
                 var binaryData = [];
					binaryData.push(data);
				
                 var objectUrl = URL.createObjectURL(new Blob(binaryData, {type: targetMimeType}));
					 
				self.postMessage({ data: objectUrl});
				self.close();
			});
      }).catch(function(err){
        // Prevent the error from getting swallowed in the promise
        setTimeout(function() { 
			 self.postMessage({ data: err });
			 self.close();
		},0);
    });
}, false);
