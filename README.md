# auxiliary-additions

[![Build Status](https://travis-ci.org/sapling-team/auxiliary-additions.svg?branch=master)](https://travis-ci.org/sapling-team/auxiliary-additions)

辅助，补充underscore（工具函数，类扩展），兼容IE8+

## 如何使用

如果你直接引入此文件：

```html
	<script src="./build/auxiliary.js" charset="utf-8"></script>
```
可以通过`window.Auxiliary`来使用

如果你使用模块化的机制：

```JavaScript
var Auxiliary = require('auxiliary-additions');
```
直接require进来即可。

`auxiliary-additions`主要提供了一些日常用到的函数或者类，比如`cookie`，`表单跨域`等，使用时你可以详细的阅读下列的文档。

## Api

