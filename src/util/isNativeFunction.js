/**
 * @time 2012年9月27日
 * @author icepy
 * @info 判断是否是原生函数
 */

'use strict';

(function (factory) {
    var root = (typeof self == 'object' && self.self == self && self) ||
		(typeof global == 'object' && global.global == global && global);
    if(typeof exports === 'object' && typeof module === 'object'){
		module.exports = factory();
	}else if(typeof exports === 'object'){
		exports['isNativeFunction'] = factory()
	}else{
        if (!root.ICEPlugs) {
			root.ICEPlugs = {};
		};
		root.ICEPlugs.isNativeFunction = factory();
	}
}(function () {
    var toString = Object.prototype.toString;
    var funToString = Function.prototype.toString;
    var reConstructor= /^\[object .+?Constructor\]$/;
    var reNative = RegExp('^' +
        String(toString)
        .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );
    return function(value){
        var type = typeof value;
        return type === 'function' ? reNative.test(funToString.call(value)) : (value && type === 'object' && reConstructor.test(toString.call(value))) || false;
    };
}));
