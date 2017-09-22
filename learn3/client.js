var http = require('http');

// 用于请求的选项
var options = {
  host: '127.0.0.1',
  port: '8082',
  path: '/index.html'
};

var callback = function(response){
  var body = '';
  response.on('data',function(data){
    body += data;
  });
  response.on('end',function(){
    console.log(body);
  });
}

var req = http.request(options,callback);
req.end();
