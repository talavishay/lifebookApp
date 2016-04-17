module.exports = function(App){
	var file = require('./d8model.js')(App);
	//~ defaults : {
		//~ filename : "null.svg",
	//~ },
	file.prototype._type 		= 'file';
	file.prototype._root 		= 'entity';
	file.prototype.idAttribute 	= 'fid';
	file.prototype.initialize 	= function(options) {
		App._.bindAll(this, "_attachBlob", "_attachFile", "_downloadFile");
		this.on({
			"sync" : this._downloadFile,
		},this);
		if(this.id){
			this.fetch();
		};
			
	};
	file.prototype._downloadFile = function() {
		var uri = '/lifebook/images/'+this.get("uuid");
//TODO: cache
App.nprogress.start();
		request = new XMLHttpRequest();
		request.responseType = 'blob';
		request.open("GET", uri, true);
		request.onprogress = App.nprogress._onprogress;
		request.onload =  this._attachBlob;
		request.send(null);
		//~ return request;
	};
	file.prototype._blobToFile = function(blob) {
		return new File(
			[blob], 
			this.get("filename"), 
			{type:  "image/"+  (this.get("type") || "png") });
	},
	file.prototype._attachBlob = function(e) {
		this._attachFile(this._blobToFile( e.target.response || e ));
	},
	file.prototype._attachFile = function(File) {
		this.set({
			"_file" : new App.models.files.draft({
				_id : this.get("uuid"),
				uuid : this.get("uuid"),
				fid : this.get("fid"),
				file : File
			},{
				parse:true
			})
		});
	};
	file.prototype._saveFile = function(options) {
		var model = this;
		return new Promise(function(resolve, reject){
			
			var xhr = new XMLHttpRequest();
			
			App.nprogress.start();
			//TODO: replace fid for uuid 
			xhr.open('POST', '/lifebook/uploads/'+model.get("fid"), true);
			xhr.upload.addEventListener('progress', App.nprogress._onprogress);
			xhr.onerror = function(err) {
				reject(err);
			};
			xhr.onload = function(data) {
				this.response.state = "remote";
				var _res = JSON.parse(this.response);
				model.set(_res);
				model.get("_file").set(_res);
				//~ model.get("_file").set("state", "remote");
				App.nprogress.done();
				resolve(model.get("_file"));
			};
			xhr.send(model.get("_file").get("file"));
			
		});
	};
	return file;
};
//~ file.prototype.formatBytes = function (bytes,decimals) {
	   //~ if(bytes == 0) return '0 Byte';
	   //~ var k = 1000; // or 1024 for binary
	   //~ var dm = decimals + 1 || 3;
	   //~ var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	   //~ var i = Math.floor(Math.log(bytes) / Math.log(k));
	   //~ return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	//~ };
	//~ var uploadFileModel  = Backbone.Model.extend({ url: '/lifebook/uploads/'+this.get("uuid")});
		//~ var _uploadFileModel = new uploadFileModel();
		//~ _uploadFileModel.save( 'file', this.get( "file"), { formData: true } );
		//~ _uploadFileModel.on('all', (name, child, err)=>{ console.log(name,err)});
		
		//~ var fd = new FormData();
		//~ fd.append('name', 'test.wav');
		//~ fd.append('files[file][]', this.get( "file"));
		//~ App.$.ajax({
			//~ type: 'POST',
			//~ url: '/lifebook/uploads/'+this.get("uuid"),
			//~ data: fd,
			//~ processData: false,
			//~ contentType: false
		//~ }).done(function(data) {
			   //~ console.log(data);
//~ }); 
//~ ## DRUAPL 8 REST ENTITTY RESPONSE  ##
//~ changed:"1459799674"
//~ created:"1459799669"
//~ fid:"3"
//~ file:Blob
//~ filemime:"image/jpeg"
//~ filename:"DSC_0200.JPG"
//~ filesize:"3179049"
//~ id:3
//~ langcode:"he"
//~ name:"new"
//~ state:"remote"
//~ status:"1"
//~ uid:"1"
//~ uri:"public://2016-04/DSC_0200.JPG"
//~ url:"blob:http%3A//lifebookapp/6768555c-67a1-4c7a-bd6a-2e3d797f6782"
//~ uuid:"101c026d-b754-4014-af72-d45cbcba38d7"
//~ email.on('progress', console.log);

	//~ file.prototype.___XMLHttprequestBlob = function(resolve,reject,url) {
			//~ var oReq = new XMLHttpRequest();
			//~ oReq.open("GET", url, true);
			//~ oReq.onProgress =  function(oEvent) {
			  //~ if (oEvent.lengthComputable) {
				//~ var percentComplete = oEvent.loaded / oEvent.total;
				//~ console.log(percentComplete);
			  //~ } else {
				//~ // Unable to compute progress information since the total size is unknown
			  //~ };
			//~ };
			//~ oReq.responseType = "arraybuffer";

			//~ oReq.onload = function(oEvent) {
				//~ if(oReq.response){
					//~ resolve(oReq.response);
				//~ } else {
					//~ reject(oEvent);
				//~ };
			//~ };
			//~ oReq.send();
	//~ },
	//~ file.prototype._viewFile 	= function(options) {
		//~ var url = this.get("_file").get("src");
		//~ window.open(url , "_blank");
	//~ };
	//~ file.prototype._logFile 	= function(options) {
		//~ console.log("file : ",this.get("_file").get("file"));
	//~ };
