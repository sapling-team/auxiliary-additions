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

**cookie**

Create a cookie, valid across the entire site:

```JavaScript
cookie.set('name', 'value');
```

Create a cookie that expires 7 days from now, valid across the entire site:

```JavaScript
cookie.set('name', 'value', { expires: 7 });
```

Create an expiring cookie, valid to the path of the current page:

```JavaScript
cookie.set('name', 'value', { expires: 7, path: '' });
```

Read cookie:

```JavaScript
cookie.get('name'); // => 'value'
cookie.get('nothing'); // => undefined
```

Read all visible cookie:

```JavaScript
cookie.get(); // => { name: 'value' }
```

Delete cookie:

```JavaScript
cookie.remove('name');
```

Delete a cookie valid to the path of the current page:

```JavaScript
cookie.set('name', 'value', { path: '' });
cookie.remove('name'); // fail!
cookie.remove('name', { path: '' }); // removed!
```

引用：[https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)

**url**

处理一个字符串URL：

```JavaScript
    var urlString = 'https://github.com/icepy?id=1';
    var obj = url.parse(urlString);
```

`obj`结构：

```JavaScript
{
    "port": temp.port,
    "protocol": temp.protocol.replace(':', ''),
    "hash": temp.hash.replace('#', ''),
    "host": temp.host,
    "href": temp.href,
    "hostname": temp.hostname,
    "pathname": temp.pathname,
    "search": temp.search,
    "query": {}
}
```

拼接一个完整的url字符串：

```JavaScript
    var urlString = 'https://github.com/icepy'
    var href = url.format(urlString,{
        query: {
            id: 1
        }
    });

    //https://github.com/icepy?id=1
```

将参数 to 位置的字符解析到一个绝对路径里：

```JavaScript
    var url = url.resolve('github/icepy','../co')
```

返回指定文件名的扩展名称：

```JavaScript
    var name = url.extname('img.jpg');

    // jpg
```

将search参数转换为obj：

```JavaScript
    var obj = url.parseSearch('?id=1&k=2')

    //{id:1,k:2}
```

**sheet**

新建一个style.sheet对象，来标注新的css规则：

```JavaScript
    sheet.insertRule()//
```

**isNativeFunction**

判断是否为原生函数

```JavaScript
    isNativeFunction('alert')  //true
```

**uniqueId**

生成一个唯一id

```JavaScript
    uniqueId('icepy')  //icepy1
```

**AjaxForm**

模拟表单Ajax提交：

```JavaScript

//this.$el 为表单对象

var ajaxForm = AjaxForm.classInstanceAjaxForm(this.$el,{
    type:'img'
});
this.ajaxForm.done(function(cw){
    var loc = cw.location;
    var search = decodeURIComponent(loc.search);
    var query = url.parseSearch(search);
});
this.ajaxForm.fail(function(){
    
});
```

**UploadFile**

表单上传文件：

```JavaScript
var uploadParams = {
  el: this.formDOM, //form dom 对象
  url: '', //上传地址
  data: ctrlData, //上传的元数据
  filename: 'img', //上传标识
  className: 'file' //上传input的 class name
};
this.upload = new UploadFile(uploadParams);
this.upload.done(function (response) {
  self.imageStateDOM.html(uploadDone);
  self.previewImage(response);
  self.trigger('uploadFileSuccess', response);
});
this.upload.fail(function () {
    //上传失败
});
```

