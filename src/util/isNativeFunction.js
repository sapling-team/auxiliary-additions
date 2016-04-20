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
