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
