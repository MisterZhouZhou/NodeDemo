// node 7.9已支持箭头函数
var http = require('http');
var server =  http.createServer((req,res)=>{
   res.writeHead(200,{'Content-Type':'text/html'});
   res.write('<h1>hello</h1>');
   res.end('Bye');
   // 关闭服务，可能不会立刻关闭
   server.close();
   console.log( 'Bye!' );
}).listen(3000);
