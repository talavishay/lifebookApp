var file = {	
	sync: App.BackbonePouch.sync({
		db: App.PouchDB('files')
	}),
	constructor: function() {
		Backbone.Model.apply(this, arguments);
		App._.bindAll(this, 'dbBlobToUrl');
		
		arguments[0]["objectUrl"] = this.defaults.objectUrl;
		if(!this.isNew()){
			this.on("sync",this.attachment(this.get("name"), this.dbBlobToUrl));
		}
	},
	parse : function(response, options){	
		delete response.objectUrl;
		return response.doc ? _.pluck(response, 'doc') : response;
	},
	dbBlobToUrl : function(er, blob){
		this.set("objectUrl", !er ? 
			URL.createObjectURL(blob) : 
			this.defaults.objectUrlErr );
		this.set("saved" , er? false : true );
	},
	defaults : {
		"objectUrl" : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTI1LjE1MyA1MjUuMTUzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MjUuMTUzIDUyNS4xNTM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0wLDI2Mi41NzZjMCw2NC41MDYsMjYuNTg2LDEyMi41NTcsNjguODE3LDE2NC41N0wwLDQ5NS45NjNoMTc1LjAwN1YzMjAuOTU2bC02NS4yOTQsNjUuMjk0DQoJCWMtMzEuNTk3LTMxLjc5NC01MS4zMzQtNzUuMjk0LTUxLjMzNC0xMjMuNjczYzAtNzYuMDgxLDQ4LjczLTE0MC45MzgsMTE2LjYyOC0xNjQuNzg4VjM2LjgwNEM3NC4zNzUsNjIuNjksMCwxNTMuNzYsMCwyNjIuNTc2eg0KCQkgTTIzMy4zODcsNDA4LjM5NGg1OC4zNzl2LTU4LjI0OGgtNTguMzc5VjQwOC4zOTR6IE01MjUuMTUzLDI5LjE5SDM1MC4xNDV2MTc1LjAwN2w2NS4yOTQtNjUuMjk0DQoJCWMzMS41OTcsMzEuNzk0LDUxLjMzNCw3NS4yOTQsNTEuMzM0LDEyMy42NzNjMCw3Ni4wODEtNDguNzMsMTQwLjkzOC0xMTYuNjI4LDE2NC43ODh2NjAuOTgzDQoJCWMxMDAuNjMyLTI1Ljg4NiwxNzUuMDA3LTExNi45NTYsMTc1LjAwNy0yMjUuNzcyYzAtNjQuNTA2LTI2LjU4Ni0xMjIuNTU3LTY4LjgxNy0xNjQuNTdMNTI1LjE1MywyOS4xOXogTTIzMy4zODcsMjkxLjc2Nmg1OC4zNzkNCgkJVjExNi43NTloLTU4LjM3OVYyOTEuNzY2eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" ,
		"saved" : false ,
		"name" : "name"
	},
};
var imageModel = App.Backbone.Model.extend(file);
module.exports =  imageModel.extend(App.BackbonePouch.attachments());
