var http = require('http');
var fs = require('fs');
var url = require('url');


http.createServer(function(req,res){
  // var pathname = url.parse(request.url).pathname;
  var pathname = url.parse(req.url).pathname;
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   fs.readFile(pathname.substr(1),function(err,data){
      if(err){
         console.log(err);
         res.writeHead(404,{"Content-Type": "text/html"});
      }else{
        res.writeHead(200,{"Content-Type": "text/html"});
        res.write(data.toString());
      }
      res.end();
   });
}).listen(8082);
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8082/');
