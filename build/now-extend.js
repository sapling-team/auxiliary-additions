/******/ (function(modules) { // webpackBootstrap
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
	var store = __webpack_require__(2);
	var cookie = __webpack_require__(3);
	
	module.exports = {
	    url:url,
	    store:store,
	    cookie:cookie
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成处理URL字符串
	 *
	 */
	
	'use strict';
	
	(function(factory) {
		var root = (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);
		if(true){
			module.exports = factory();
		}else if(typeof exports === 'object'){
			exports['url'] = factory()
		}else{
			if (!root.ICEPlugs) {
				root.ICEPlugs = {};
			};
			root.ICEPlugs.url = factory();
		};
	})(function() {
		var urlString = [];
		var location = window.location;
		return {
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
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月27日
	 * @author icepy
	 * @info 封装完成本地缓存API
	 *
	 * @time 2016年2月27日
	 * @author icepy
	 * @info 改造兼容webpack打包
	 */
	
	'use strict';
	
	(function(factory) {
		var root = (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);
		if(true){
			module.exports = factory();
		}else if(typeof exports === 'object'){
			exports['store'] = factory()
		}else{
			if (!root.ICEPlugs) {
				root.ICEPlugs = {};
			};
			root.ICEPlugs.store = factory();
		};
	})(function() {
		var store = {};
		var _window = window;
		var localStorageName = 'localStorage';
		var sessionStorageName = 'sessionStorage';
		var rootKey = 'ICEStorageCache';
		var storage, session;
		var isLocalStorageNameSupported = function() {
			try {
				return (localStorageName in _window && _window[localStorageName]);
			} catch (err) {
				return false;
			}
		};
		var isSessionStorageNameSupported = function() {
			try {
				return (sessionStorageName in _window && _window[sessionStorageName]);
			} catch (err) {
				return false;
			}
		};
		store.disabled = false;
		store.version = '0.0.1';
		/**
		 * [has 根据Key判断是否存在]
		 * @param  {[String]}  key [description]
		 * @return {Boolean}     [description]
		 */
		store.has = function(key) {
			return store.get(key) !== undefined;
		};
	
		/**
		 * [transact 有存储是否成功的回调函数]
		 * @param  {[String]} key           [description]
		 * @param  {[String]} defaultVal    [description]
		 * @param  {[type]} transactionFn [description]
		 */
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal;
				defaultVal = null;
			}
	
			if (defaultVal == null) {
				defaultVal = {};
			}
	
			var val = store.get(key, defaultVal);
			transactionFn(val);
			store.set(key, val);
		};
		/**
		 * [serialize 对象转字符串]
		 * @param  {[Object]} value [description]
		 * @return {[String]}       [description]
		 */
		store.serialize = function(value) {
			return JSON.stringify(value);
		};
		/**
		 * [deserialize 字符串格式化对象]
		 * @param  {[String]} value [description]
		 * @return {[Object]}       [description]
		 */
		store.deserialize = function(value) {
			if (typeof value != 'string') {
				return undefined;
			}
			try {
				return JSON.parse(value);
			} catch (e) {
				return value || undefined;
			}
		};
		if (isLocalStorageNameSupported()) {
			storage = _window[localStorageName];
			/**
			 * [set  存储本地缓存]
			 * @param {[String]} key [description]
			 * @param {[Object]} val [description]
			 */
			store.set = function(key, val) {
				if (val === undefined) {
					return store.remove(key);
				}
				storage.setItem(key, store.serialize(val));
				return val;
			};
	
			/**
			 * [get 获取本地缓存]
			 * @param  {[String]} key        [description]
			 * @param  {[type]} defaultVal [description]
			 * @return {[Boolean]}            [description]
			 */
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key));
				return (val === undefined ? defaultVal : val);
			};
	
			/**
			 * [remove 根据key名删除一个本地缓存]
			 * @param  {[String]} key [description]
			 */
			store.remove = function(key) {
				storage.removeItem(key);
			};
	
			/**
			 * [clear 清除所有的本地缓存]
			 */
			store.clear = function() {
				storage.clear();
			};
	
			/**
			 * [getAll description]
			 * @return {[Object]} [description]
			 */
			store.getAll = function() {
				var ret = {};
				store.forEach(function(key, val) {
					ret[key] = val;
				});
				return ret;
			};
			store.forEach = function(callback) {
				for (var i = 0; i < storage.length; i++) {
					var key = storage.key(i);
					callback(key, store.get(key));
				}
			};
			//可以设置过期时间
			store.expiration = {
				/**
				 * [set 存储可以设置过期时间的本地缓存]
				 * @param {[String]} key [description]
				 * @param {[Object]} val [description]
				 * @param {[Number]} exp [description]
				 */
				set: function(key, val, exp) {
					//exp 接受自然整数，以一小时60分钟为单位
					var Root = store.get(rootKey) || {};
					Root[key] = {
						val: val,
						exp: exp * (1000 * 60 * 60),
						time: new Date().getTime()
					};
					store.set(rootKey, Root);
				},
				/**
				 * [get 获取有过期时间的本地缓存]
				 * @param  {[String]} key [description]
				 * @return {[*]}     [*]
				 */
				get: function(key) {
					var Root = store.get(rootKey);
					if (!Root) {
						//根节点不存在
						return null;
					};
					var info = Root[key];
					if (!info) {
						return null;
					}
					if (new Date().getTime() - info.time > info.exp) {
						return null;
					}
					return info.val
				},
				getAll: function() {
					var Root = store.get(rootKey);
					return Root || null;
				},
				resetSave: function(val) {
					store.set(rootKey, val);
				}
			};
			if (isSessionStorageNameSupported()) {
				session = _window[sessionStorageName];
				//会话模式
				store.session = {
					/**
					 * [set 存储一个会话]
					 * @param {[String]} key [description]
					 * @param {[*]} val [*]
					 */
					set: function(key, val) {
						if (val === undefined) {
							return store.remove(key);
						}
						var stayStore;
						if (Object.prototype.toString.call(val) === '[object Object]') {
							stayStore = store.serialize(val);
						} else {
							stayStore = val;
						};
						session.setItem(key, stayStore);
					},
					/**
					 * [get 获取一个会话]
					 * @param  {[String]} key [description]
					 * @return {[Boolean]}     [description]
					 */
					get: function(key) {
						var val = store.deserialize(session.getItem(key));
						return (val === undefined ? defaultVal : val);
					}
				}
			};
		}
		try {
			var testKey = '__storeJs__';
			store.set(testKey, testKey);
			if (store.get(testKey) != testKey) {
				store.disabled = true;
			}
			store.remove(testKey);
		} catch (e) {
			store.disabled = true;
		}
		store.enabled = !store.disabled;
		if (store.enabled) {
			var modelCache = store.expiration.getAll();
			if (modelCache) {
				for (var cacheKey in modelCache) {
					var cache = modelCache[cacheKey];
					if (new Date().getTime() - cache.time > cache.exp) {
						cache = null;
						delete modelCache[cacheKey]
					}
				}
			};
			store.expiration.resetSave(modelCache);
		};
		return store;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @time 2012年10月26日
	 * @author icepy
	 * @info 完成cookie模块
	 */
	
	'use strict';
	
	(function(factory) {
		var root = (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);
		if(true){
			module.exports = factory();
		}else if(typeof exports === 'object'){
			exports['cookie'] = factory()
		}else{
			if (!root.ICEPlugs) {
				root.ICEPlugs = {};
			};
			root.ICEPlugs.cookie = factory();
		};
	})(function() {
		return {
			/**
			 * [get 获取cookie]
			 * @param  {[String]} name [description]
			 */
			get: function(name) {
				var cookieName = encodeURIComponent(name) + '=';
				var cookieStart = document.cookie.indexOf(cookieName);
				var cookieValue = null;
				var cookieEnd;
				if (cookieStart > -1) {
					cookieEnd = document.cookie.indexOf(';', cookieStart);
					if (cookieEnd == -1) {
						cookieEnd = document.cookie.length;
					}
					cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
						cookieName.length, cookieEnd));
				}
				return cookieValue;
			},
			/**
			 * [set 设置cookie]
			 * @param {[type]} name    [description]
			 * @param {[type]} value   [description]
			 * @param {[type]} expires [description]
			 * @param {[type]} path    [description]
			 * @param {[type]} domain  [description]
			 * @param {[type]} secure  [description]
			 */
			set: function(name, value, expires, path, domain, secure) {
				var cookieText = encodeURIComponent(name) + '=' +
					encodeURIComponent(value);
				if (expires instanceof Date) {
					cookieText += '; expires=' + expires.toUTCString();
				}
				if (path) {
					cookieText += '; path=' + path;
				}
				if (domain) {
					cookieText += '; domain=' + domain;
				}
				if (secure) {
					cookieText += '; secure';
				}
				document.cookie = cookieText;
			},
			/**
			 * [unset 删除cookie]
			 * @param  {[type]} name   [description]
			 * @param  {[type]} path   [description]
			 * @param  {[type]} domain [description]
			 * @param  {[type]} secure [description]
			 */
			unset: function(name, path, domain, secure) {
				this.set(name, '', new Date(0), path, domain, secure);
			},
			version: '0.0.1'
		};
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=now-extend.js.map