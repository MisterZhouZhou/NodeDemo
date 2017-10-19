let app = document.getElementById('app');

var span = document.createElement('span'); //1、创建元素
span.innerHTML = 'hello world!';
var span2 = document.createElement('span'); //2、创建元素
span2.innerHTML = 'hello world2!';

// 添加元素
app.appendChild(span);
app.appendChild(span2);
