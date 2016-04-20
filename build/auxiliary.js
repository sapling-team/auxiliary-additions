(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Auxiliary"] = factory();
	else
		root["Auxiliary"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(1);
	var sheet = __webpack_require__(2);
	var isNativeFunction = __webpack_require__(3);
	var cookie = __webpack_require__(4);
	var AjaxForm = __webpack_require__(5);
	var UploadFile = __webpack_require__(7);
	
	module.exports = {
	    'url':url,
	    'sheet':sheet,
	    'isNativeFunction':isNativeFunction,
	    'cookie':cookie,
	    'AjaxForm':AjaxForm,
	    'UploadFile':UploadFile
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成处理URL字符串
	 *
	 */
	
	'use strict';
	var urlString = [];
	var location = window.location;
	
	module.exports = {
		/**
		 * [parse 处理一个字符串URL]
		 * @param  {[String]} url [传入一个字符串url]
		 * @return {[Object]}     [返回一个object对象]
		 */
		parse: function(url) {
			var temp = document.createElement('a');
			temp.href = url;
			var result = {
				"port": temp.port,
				"protocol": temp.protocol.replace(':', ''),
				"hash": temp.hash.replace('#', ''),
				"host": temp.host,
				"href": temp.href,
				"hostname": temp.hostname,
				"pathname": temp.pathname,
				"search": temp.search,
				"query": {}
			};
			var seg = result.search.replace(/^\?/, '').split('&'),
				leng = seg.length,
				i = 0,
				target;
			for (; i < leng; i++) {
				if (!seg[i]) continue;
				target = seg[i].split('=');
				result.query[target[0]] = target[1];
			}
			temp = null;
			return result;
		},
		/**
		 * [format 拼接一个完整的url字符串]
		 * @param  {[String]} url [URL]
		 * @param  {[Object]} obj [需要拼接的query或者hash参数]
		 * @return {[String]}     [返回一个完整的URL字符串]
		 */
		format: function(url, obj) {
			var i = 0,
				query = obj.query,
				hash = obj.hash;
			urlString.length = 0;
			urlString.push(url.lastIndexOf('?') > -1 ? url : url + '?');
			if (query) {
				for (var key in query) {
					var val = query[key]
					if (!i) {
						i++;
						urlString.push(key + '=' + val)
					} else {
						urlString.push('&' + key + '=' + val);
					}
				}
			};
			if (hash) {
				urlString.push(hash.indexOf('#') > -1 ? hash : '#' + hash);
			};
			return urlString.join('');
		},
		/**
		 * [resolve 将参数 to 位置的字符解析到一个绝对路径里]
		 * @param  {[String]} from [源路径]
		 * @param  {[String]} to   [将被解析到绝对路径的字符串]
		 * @return {[String]}      [返回一个绝对路径字符串]
		 */
		resolve: function(from, to) {
			/**
			 *  路径描述 ./当前路径 ../父路径
			 */
			if (/^(.\/)/.test(to)) {
				to = to.replace(/^(.\/)/, '/');
			};
	
			if (/^(..\/)/.test(to)) {
				from = from.substr(0, from.lastIndexOf('/'));
				to = to.replace(/^(..\/)/, '/');
			};
			return from + to;
		},
		/**
		 * [extname 返回指定文件名的扩展名称]
		 * @param  {[String]} p [description]
		 * @return {[String]}   [description]
		 */
		extname: function(p) {
			var _p = p.split('.');
			return _p[_p.length - 1] || '';
		},
		/**
		 * [parseSearch 将search参数转换为obj]
		 * @param  {[type]} query [description]
		 * @return {[type]}       [description]
		 */
		parseSearch:function(query){
			var _query = {};
			var seg = query.replace(/^\?/, '').split('&'),
				leng = seg.length,
				i = 0,
				value,
				target;
			for (; i < leng; i++) {
				if (!seg[i]) continue;
				target = seg[i].split('=');
				value = target[1];
				if ((/^\[/.test(value) && /\]$/.test(value)) || (/^{/.test(value) || /\}$/.test(value))) {
					value = JSON.parse(value);
				};
				_query[target[0]] = value;
			}
			return _query;
		}
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @time 2012年9月26日
	 * @author icepy
	 * @info 新建一个style.sheet对象，来标注新的css规则等
	 */
	
	'use strict';
	
	module.exports = sheet();
	
	function sheet() {
	  // 使用style.sheet.insertRule()
	  var style = document.createElement('style');
	  style.appendChild(document.createTextNode(''));
	  document.head.appendChild(style);
	  return style.sheet;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * @time 2012年9月27日
	 * @author icepy
	 * @info 判断是否是原生函数
	 */
	
	'use strict';
	
	module.exports = isNativeFunction;
	
	var toString = Object.prototype.toString;
	var funToString = Function.prototype.toString;
	var reConstructor= /^\[object .+?Constructor\]$/;
	var reNative = RegExp('^' +
	  String(toString)
	  .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	/**
	 * [判断一个值或者对象是否为原生函数或对象]
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	function isNativeFunction(value) {
	  var type = typeof value;
	  return type === 'function' ? reNative.test(funToString.call(value)) : (value && type === 'object' && reConstructor.test(toString.call(value))) || false;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	    引用`https://github.com/js-cookie/js-cookie` 2.1.0
	 */
	
	'use strict';
	
	module.exports = init(function () {});
	
	function extend () {
	  var i = 0;
	  var result = {};
	  for (; i < arguments.length; i++) {
	    var attributes = arguments[ i ];
	    for (var key in attributes) {
	      result[key] = attributes[key];
	    }
	  }
	  return result;
	}
	
	function init (converter) {
	  function api (key, value, attributes) {
	    var result;
	
	    // Write
	
	    if (arguments.length > 1) {
	      attributes = extend({
	        path: '/'
	      }, api.defaults, attributes);
	
	      if (typeof attributes.expires === 'number') {
	        var expires = new Date();
	        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
	        attributes.expires = expires;
	      }
	
	      try {
	        result = JSON.stringify(value);
	        if (/^[\{\[]/.test(result)) {
	          value = result;
	        }
	      } catch (e) {}
	
	      if (!converter.write) {
	        value = encodeURIComponent(String(value))
	          .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
	      } else {
	        value = converter.write(value, key);
	      }
	
	      key = encodeURIComponent(String(key));
	      key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
	      key = key.replace(/[\(\)]/g, escape);
	
	      return (document.cookie = [
	        key, '=', value,
	        attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
	        attributes.path    && '; path=' + attributes.path,
	        attributes.domain  && '; domain=' + attributes.domain,
	        attributes.secure ? '; secure' : ''
	      ].join(''));
	    }
	
	    // Read
	
	    if (!key) {
	      result = {};
	    }
	
	    // To prevent the for loop in the first place assign an empty array
	    // in case there are no cookies at all. Also prevents odd result when
	    // calling "get()"
	    var cookies = document.cookie ? document.cookie.split('; ') : [];
	    var rdecode = /(%[0-9A-Z]{2})+/g;
	    var i = 0;
	
	    for (; i < cookies.length; i++) {
	      var parts = cookies[i].split('=');
	      var name = parts[0].replace(rdecode, decodeURIComponent);
	      var cookie = parts.slice(1).join('=');
	
	      if (cookie.charAt(0) === '"') {
	        cookie = cookie.slice(1, -1);
	      }
	
	      try {
	        cookie = converter.read ?
	          converter.read(cookie, name) : converter(cookie, name) ||
	          cookie.replace(rdecode, decodeURIComponent);
	
	        if (this.json) {
	          try {
	            cookie = JSON.parse(cookie);
	          } catch (e) {}
	        }
	
	        if (key === name) {
	          result = cookie;
	          break;
	        }
	
	        if (!key) {
	          result[name] = cookie;
	        }
	      } catch (e) {}
	    }
	
	    return result;
	  }
	
	  api.get = api.set = api;
	  api.getJSON = function () {
	    return api.apply({
	      json: true
	    }, [].slice.call(arguments));
	  };
	  api.defaults = {};
	
	  api.remove = function (key, attributes) {
	    api(key, '', extend(attributes, {
	      expires: -1
	    }));
	  };
	
	  api.withConverter = init;
	
	  return api;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2016年3月3日
	 * @author  icepy
	 * @info  跨域模拟Ajax的Form表单
	 */
	
	'use strict';
	
	var url = __webpack_require__(1);
	var uniqueId = __webpack_require__(6);
	
	var AjaxForm = function(options){
		options = options || {};
		this.$el = typeof options.el === 'string' ? $(options.el) : options.el;
		this.uid = uniqueId('AjaxForm-');
		this.loadState = false;
		this._init();
	};
	
	AjaxForm.prototype._init = function(){
		var defer = $.Deferred();
		$.extend(this,defer.promise());
		this._createIframe();
		this._addEvent(defer);
	};
	
	AjaxForm.prototype._createIframe = function(){
		var iframeHTML = '<iframe id="'+this.uid+'" name="'+this.uid+'"  style="display: none;" src="about:blank"></iframe>';
		this.$el.attr('target',this.uid);
		this.$el.append(iframeHTML);
		this._iframe = $('#'+this.uid);
		$('<input />').attr({
			type : 'hidden',
			name : 'cross_post',
			value : '1'
		}).appendTo(this.$el);
	};
	
	AjaxForm.prototype._addEvent = function(promise){
		var self = this;
		this._iframe.on('load',function(){
			if (self.loadState) {
				var cw = this.contentWindow;
				var loc = cw.location;
				if (loc.href === 'about:blank') {
					promise.reject(cw);
				}else{
					try {//如果后台没有作跨域处理，则需手动触发onComplete
						var body = this._iframe[0].contentWindow.document.body;
						innerText = body.innerText;
						if (!innerText) {
							innerText = body.innerHTML;
						};
						if (innerText) {
							promise.resolve($.parseJSON(innerText));
						};
					} catch (e) {
						promise.resolve(cw);
					}
				};
				self.loadState = false;
			};
		});
	};
	
	AjaxForm.prototype.encrypto = function(secret){
		var self = this;
		$.each(secret, function(key, value) {
			var $item = self.$el.find('[name=' + key + ']');
			if ($item.length === 0) {
				$('<input />').attr({
					type : 'hidden',
					name : key,
					value : value
				}).appendTo(self.$el);
			} else {
				$item.val(value);
			}
		});
	};
	
	var shared = null;
	AjaxForm.sharedInstanceAjaxForm = function(element,options){
		if (!shared) {
			options = options || {};
			options.el = element;
			shared = new AjaxForm(options);
		}
		return shared;
	};
	AjaxForm.classInstanceAjaxForm = function(element,options){
		options = options || {};
		options.el = element;
		return new AjaxForm(options);
	};
	
	module.exports = AjaxForm;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	module.exports = uniqueId;
	
	var idCounter = 0;
	function uniqueId(prefix) {
	  var id = ++idCounter + '';
	  return prefix ? prefix + id : id;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @time 2016年3月3日
	 * @author  icepy
	 * @info  跨域上传图片，只支持iframe的方式
	 */
	
	'use strict';
	
	var url = __webpack_require__(1);
	var AjaxForm = __webpack_require__(5);
	var uniqueId = __webpack_require__(6);
	
	var UploadFile = function(options){
		var self = this;
		this.$el = typeof options.el === 'string' ? $(options.el) : options.el;
		this.uid = uniqueId('UploadFile-');
		this.options = options;
		this._data = options.data || {};
		this._filename = options.filename || 'image';
		this._url = options.url;
		if (!this._url) {
			console.warn('配置上传URL');
			return;
		};
		this._init();
		var defer = $.Deferred();
		$.extend(this,defer.promise());
		this.ajaxForm = AjaxForm.classInstanceAjaxForm(this.$el,{
			type:'img'
		});
		this.ajaxForm.done(function(cw){
			var loc = cw.location;
			var search = decodeURIComponent(loc.search);
			var query = url.parseSearch(search);
			defer.resolve(query);
		});
		this.ajaxForm.fail(function(){
			defer.reject(this);
		});
	};
	
	UploadFile.prototype._init = function(){
		this._createElement();
	};
	
	UploadFile.prototype._createElement = function(){
		var inputs = '';
		for(var name in this._data){
			var value = this._data[name];
			var type = Object.prototype.toString.call(value);
			if (type === '[object Object]' || type === '[object Array]') {
				value = JSON.stringify(value);
			};
			inputs += '<input type="hidden" name="'+name+'" value=\''+value+'\'/>';
		};
		inputs += '<input type="file" class="opacity0 upload-file '+this.options.className+'" name="'+this._filename+'"  />';
		this.$el.attr('method','POST');
		this.$el.attr('action',this._url);
		this.$el.attr('enctype','multipart/form-data');
		this.$el.append(inputs);
	};
	
	//错误码消息映射
	UploadFile.prototype.parseErrorMsg = function(res){
		if(res && res.state == 'SUCCESS'){
			return true;
		}
		var code = res.errCode *1 || 0;
		switch(code){
			case 29:
				return '上传的文件太大了,请重新上传';
			case 31:
				return '请上传JPGE,JPG,PNG,GIF等格式的图片文件';
		}
		return '文件上传失败,请重新上传';
	};
	
	/**
	 * [submit 提交文件]
	 * @return {[type]} [description]
	 */
	UploadFile.prototype.submit = function(){
		this.ajaxForm.loadState = true;
		if (typeof this._before === 'function' ) {
			this._before();
		};
		this.$el.submit();
	};
	
	var shared = null;
	UploadFile.sharedInstanceUploadFile = function(options){
		if (!shared) {
			shared = new UploadFile(options);
		}
		return shared;
	};
	UploadFile.classInstanceUploadFile = function(options){
		return new UploadFile(options);
	};
	
	module.exports = UploadFile;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=auxiliary.js.map