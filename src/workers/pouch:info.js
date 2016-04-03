var PouchDB = require('pouchdb');

self.addEventListener('message', function(ev) {
	
	new PouchDB(ev.data)
		.then(function (db) { 
			 return db.info()})
		.then( function(info) {
			return self.postMessage(info);})
		.then(self.close);
		
}, false);
