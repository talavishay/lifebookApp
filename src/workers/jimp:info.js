var blobUtil = require("blob-util"),
	arrayBufferToBuffer = require('arraybuffer-to-buffer');

//~ importScripts("/bower_components/caman/dist/caman.full.min.js");
//~ 
var Caman = require('caman').Caman;
	//~ Jimp = require("jimp");
	
self.addEventListener('message', function(e) {
	var objectUrl = e.data;
	//~ _jimp(objectUrl)
	_Caman(objectUrl)	
}, false);

function _Caman(objectUrl){

	_resolveObjectUrlForJimp(objectUrl)
		.then(function(jimpImage){
				Caman(jimpImage, function () {
					this.brightness(10);
					this.contrast(20);
					this.render(function () {
						self.postMessage("caman  done render");
						alert("Done!")		;
					});
			});
			//~ self.close();
		}).catch(function(err){
        // Prevent the error from getting swallowed in the promise
    
        setTimeout(function() { 
			 self.postMessage({ data: err.message });
			 //~ self.close();
		},0);
    });
}	
function _jimp(objectUrl){

	_resolveObjectUrlForJimp(objectUrl)
	//~ .then(_jimpRead);
		.then(Jimp.read)
		.then(function(jimpImage){
			self.postMessage("JIMP  done reading");
			self.postMessage(jimpImage.hash());
			//~ self.close();
		}).catch(function(err){
        // Prevent the error from getting swallowed in the promise
      
        setTimeout(function() { 
			 self.postMessage({ data: err.message });
			 //~ self.close();
		},0);
    });
}	
function _resolveObjectUrlForJimp(objectUrl){
	return new Promise(function (resolve, reject) {
		_toBlob(objectUrl)
		.then(_toBuffer)
		.then(resolve);
	});
};
function _toBlob(objectUrl){
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', objectUrl, true);
		xhr.responseType = 'blob';
		xhr.onreadystatechange = function(){
			if(xhr.DONE !== xhr.readyState) return;
			if(xhr.response instanceof Blob){
				resolve(xhr.response);
			};
		}
		xhr.send();
	});
};
function _toBuffer(blob){
	return new Promise(function (resolve, reject) {
		blobUtil
		.blobToArrayBuffer(blob)
			.then(function(buf){
				resolve(arrayBufferToBuffer(buf));
		});
	});	
};
