var blobUtil = require("blob-util");

// convert to Blob & send (as ArrayBuffer..)
App.fabricToolsChannel.on( "worker:jimp:info:arrayBuffer", function(url){
	blobUtil
		.imgSrcToBlob(url)
		.then(blobUtil.blobToArrayBuffer)
		.then(function(ArrayBuffer){
			_Worker_outsource({	
				type : "jimp",
				command : "info:arrayBuffer",
				postMessage : ArrayBuffer
			});
		});
});
// convert to Blob & send a refernce/objectURL to the Blob.. 
App.fabricToolsChannel.on( "worker:jimp:info", function(url){
	blobUtil
		.imgSrcToBlob(url)
		.then(URL.createObjectURL)
		.then(function(objectURL){
			_Worker_outsource({	
				type : "jimp",
				command : "info",
				postMessage : objectURL
			});
		});
});

// convert to Blob & Store/update? to Db & send a DBid.. 
App.fabricToolsChannel.on( "worker:pouch:info", function(dbname){
	_Worker_outsource({	
		type : "pouch",
		command : "info",
		postMessage : dbname
	});
});

function _Worker_outsource(options){
	var _worker = new Worker('/modules/custom/app/js/src/workers/'+options.type+':'+options.command+'.build.js');
	_worker.onerror = function(err){
		console.log("onerror",err);
	};
	_worker.onmessage = function(e){
		console.log(e.data);
	};
	_worker.postMessage(options.postMessage);
};
