var http = require("http");
// 创建服务器
http.createServer(function(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello World! zw ");
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
