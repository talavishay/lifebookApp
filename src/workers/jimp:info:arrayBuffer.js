var arrayBufferToBuffer = require('arraybuffer-to-buffer'),
	Jimp = require("jimp");
	
self.addEventListener('message', function(e) {
	Jimp.read(arrayBufferToBuffer(e.data))
		.then(function(jimpImage){
			self.postMessage("JIMP  done reading");
			self.postMessage(jimpImage.hash());
			self.close();
		}).catch(function(err){
        // Prevent the error from getting swallowed in the promise
      
        setTimeout(function() { 
			 self.postMessage({ data: err.message });
			 self.close();
		},0);
    });
	
}, false);
