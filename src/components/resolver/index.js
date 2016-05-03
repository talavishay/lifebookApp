//~ var state = require('./state.js');

module.exports = function(App){
var urlResolver = {
	
	initialize : function(stage, options){
		this.stage 		= stage || App.canvas.toJSON();
		this.objects 	= this.stage.objects || App.canvas.toJSON().objects;
		this.options	=  options || {filter : {type : "image"}, key : "src"};
		this.validUrls 	= [];	this.invalidUrls =[];
		this.resolvedUrls = [];	this.replacedObjects = [];
		
		backgroundImage = this.stage.backgroundImage;
			
		if(backgroundImage) {
			backgroundImage.background = true;
			this.objects.push(backgroundImage);
		};
		
		return this.extractUrls( this.objects)
			.then(this.validateUrls)
			.then(this.resolveUrls)
			.then(this.drupalizeStage)
			.then(this.getValidObjects)
			.then(function(validObjects){
				App.resolver.validObjects = validObjects;
				App.resolver.validStage = App._.clone(App.resolver.stage);
				App.resolver.validStage.objects 		= App._.reject(validObjects, {background:true});
				var backgroundImage = App._.where(validObjects, {background:true});
				if(backgroundImage.length){
					App.resolver.validStage.backgroundImage = backgroundImage[0];
				};
				return App.resolver.validStage;
			},function(err){
				console.log("failed resolving", err);
			});
	},
	extractUrls : function(objects){
		var objects			= objects || this.objects;
			options			= this.options;
			
		return new Promise(function(resolve, reject){
			var match = ['image', 'clipedImage'],
				_objects = App._.filter(objects, function(obj){
					return	!/^http:\/\//.test(obj.src) &&
							!/data:image/.test(obj.src) &&
							 App._.contains(match, obj.type) 
				});
				
			App.resolver.urls = App._.map(_objects,	function(item){
						return item[options.key];
			});
			
			resolve(App.resolver.urls);
		});
	},
	validateUrls: function(urls){
		return new Promise(function(resolve, reject){
			var	 _resolve = App._.after(urls.length, function(){
					App.resolver.draftUrls = App._.filter(App.resolver.validUrls, function(url){
						var _url = App.resolver.extractUrl(url);
						return (_url.id !== "" && _url.drupalId  === 0 && _url.id.split('-').length === 1)
					});
					resolve(App.resolver.invalidUrls);
			});
			App._.each(	App.resolver.urls, function(url, index, list){
				App.resolver.validateSrc(url)
					.then(function(){
						App.resolver.validUrls.push(url);
						_resolve();
					},function(){
						App.resolver.invalidUrls.push(url);
						_resolve();
					});
			});
			if(!urls.length) resolve(urls);
		});
	},		
	//~ validateUrl : function(url){
		//~ return App.files.validateSrc(url);
	//~ },
	resolveUrls: function(urls){
		return new Promise(function(resolve, reject){
			var _resolve = App._.after(urls.length, function(){
				resolve(App.resolver.resolvedUrls);
			 });
			
			App._.each(urls, function(url){
				App.resolver.resolveUrl(url)
					.then(function(resolvedUrl){
						App.resolver.resolvedUrls.push(resolvedUrl);
						_resolve();
					},reject);
			});
			if(!urls.length) resolve();
		});
	},
	resolveUrl : function(_invalidUrl){
		var	invalidUrl = this.extractUrl(_invalidUrl);
		return new Promise(function(resolve, reject){
			var file = App.files.get(invalidUrl.id);
			if(file) {
				resolve(file.refreshSrc());	//found local file 
			} else if(invalidUrl.drupalId){
				App.files.resolveByFid(invalidUrl.drupalId)
					.then(function(_file){	//retrived file from drupal
						resolve(App.files.create(_file).refreshSrc());
					},reject);
			} else {

//TODO: if no file was found ( local /remote ) the invalid url would not be replaced . a "dummy" image to indicat the missing file is way around this..
//this situation causes the fabric canvas to fail loading all of it ...
//while this situation isnt suposed to happend it might be wise to replace this invalid url with a valid url showing an dummy image.
//maybe even "dynamic image + indication of the problam with it.. 404 / offline mode... ?"
//TODO: App.resolver offline mode...
				reject("drupal id = "+_invalidUrl.drupalId);
			};
		});
	},
	getValidObjects : function(){
		return new Promise(function(resolve, reject){
			var	_objects = App._.clone(App.resolver.objects);
				match = ['image', 'clipedImage'],
				_imageObjects = App._.filter(_objects, function(obj){
					return App._.contains(match, obj.type) 
				});
			
			resolvedImageObjects = App._.map(_imageObjects, function(obj){
				App._.each(	App.resolver.resolvedUrls, function(resolvedUrl, index, list){
					
					var	_url = App.resolver.extractUrl(resolvedUrl);
					
					if(obj.src.split(_url.id).length > 1){
						obj.src = resolvedUrl;
						App.resolver.replacedObjects.push(obj);
					};
					
					if(obj.src.split('fid='+_url.drupalId).length > 1){
						obj.src = resolvedUrl;
						App.resolver.replacedObjects.push(obj);
					}
				});
				return obj;
			});
			resolve(App._.extend(resolvedImageObjects, _objects));
			
		});
	},
	drupalizeStage : function(){
		return new Promise(function(resolve, reject){
			if(App.resolver.draftUrls){				
				var _resolve = App._.after(App.resolver.draftUrls.length, function(){
					resolve(App.resolver.resolvedUrls);
				 });
				App._.each(App.resolver.draftUrls ,function(obj){
					App.resolver.draftToRemote(obj)
						.then(function(res){
								_resolve(res);
						},function(err){
								reject(err);
						});
				});
				if(!App.resolver.draftUrls.length) {
					resolve();
				};
			} else {
				resolve();
			}
		});
	},
	draftToRemote : function(url){
		var	url 	= this.extractUrl(url),
			file 	= App.files.get(url.id);
		return new Promise(function(resolve, reject){
			file.drupalize()
				.then(function(res){
					App.resolver.resolvedUrls.push(res.refreshSrc());
					resolve();
				},function(err){
					reject(err);
				});
		})
	},
	_parseUrl : function(url){
		// parsing objectUrls with a ID as HASH & query appended at the
		// end for including extra meta about the image ( drupal fid )
		// url  =>  path +  hash + query
		//since our url implemtion is not standard ( query string after the hash )
		// this function prepers the url for parsing with "route-pattern" 
		// switching places between hash & query
		var s = url.split('#');
		if(s.length != 1){
			return s[0] +'?'+  s[1].split('?')[1] +'#'+ s[1].split('?')[0];
		} else{
			return url;
		}
	},
	extractUrl : function(url){
		url = this._parseUrl(url);
		//get id and drupal id from the image url 
		var r = App.routePattern.fromString(url),
				q = r.queryStringPattern,
				hash = r.hashPattern,
				id = (hash) ? hash.routeString : "",
				drupalId = (q && q.params[0].key === "fid") ? q.params[0].value : 0;
		return {
				drupalId : 	drupalId,
				id : id
		};
	},
	validateSrc : function (src){
		//TODO: why not use blob-util/imgSrcToBlob  ??
		return new Promise(function(resolve, reject){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src);
			xhr.responseType = 'blob';
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
				  return;
				}
				if(xhr.status === 200){
					resolve(src);
				} else {
					reject(src);
				};
				//~ console.log('xhr.status is: ' + xhr.status);
				//~ console.log('returned content-type is: ' + xhr.getResponseHeader('Content-Type'));
				//~ console.log('returned content-length is: ' + xhr.getResponseHeader('Content-Length'));
			};
			xhr.send();
		});
		//~ var returnedBlob = new Blob([xhr.response], {type: 'image/png'});
		//~ return  ? true : false;
	},
};
return urlResolver;
};
