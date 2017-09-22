/* 首先require 加载两个模块 */
var http = require('http'),
    url  = require('url') ;
var Router   = require('./router.js');

/* 创建http服务器 */
var app =  http.createServer(function(req,res){
  var pathname = url.parse(req.url,true).pathname;
  req.setEncoding('utf8');
  res.writeHead(200);
  Router.router(res, req, pathname);
}).listen(8888,'127.0.0.1');
/* 打印运行log */
console.log('Server running at http://127.0.0.1:8888/');
