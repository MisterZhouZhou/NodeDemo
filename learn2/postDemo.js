var http = require('http');
var querystring = require('querystring');
var util = require('util');

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';


  http.createServer(function(request,response){
    var body = '';
    request.on('data',function(chunk){
      body += chunk;
    });
    request.on('end',function(){
      // 解析参数
      body = querystring.parse(body);
      // 设置响应头部信息及编码
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      if(body.name && body.url){
        response.write("网站名：" + body.name);
        response.write("<br>");
        response.write("网站 URL：" + body.url);
      }else{
        response.write(postHTML);
      }
      response.end();
    });
  }).listen(3000);

  console.log('服务器运行于127.0.0.1:3000//');
