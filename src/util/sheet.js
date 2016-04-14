/**
 * @time 2012年9月26日
 * @author icepy
 * @info 新建一个style.sheet对象，来标注新的css规则等
 */

'use strict';

(function (factory) {
    var root = (typeof self == 'object' && self.self == self && self) ||
		(typeof global == 'object' && global.global == global && global);
    if(typeof exports === 'object' && typeof module === 'object'){
		module.exports = factory();
	}else if(typeof exports === 'object'){
		exports['sheet'] = factory()
	}else{
        if (!root.ICEPlugs) {
			root.ICEPlugs = {};
		};
		root.ICEPlugs.sheet = factory();
	}
}(function () {
    // 使用style.sheet.insertRule()
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet
}));
