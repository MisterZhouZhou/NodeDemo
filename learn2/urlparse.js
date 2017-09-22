var http = require('http');
var url  = require('url');
var util = require('util');

http.createServer(function(request,response){
  response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
  // response.end(util.inspect(url.parse(request.url, true)));
  // 解析url
  var params = url.parse(request.url,true).query;
  response.write('网站名:'+params.name);
  response.write('\n');
  response.write("网站URL："+params.url);
  response.end();
}).listen(3000);
