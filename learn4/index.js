var http = require('http');
var fs = require('fs');
var mudUrl = require('url');

server = http.createServer(onRequest);
server.listen(8888);

function onRequest(request,response){
  if(request.method == 'GET'){
    if(request.url == '/'){
      response.writeHead(200,{'Content-Type':'text/plain'});
      response.write('hello node.js');
      response.end();
    }else if(request.url == '/favicon.ico'){
       fs.readFile('test.jpg',function(err,data){
          if(err){
            console.log(err);
          }else{
            response.writeHead(200, {'Content-Type': 'image/x-icon'});
            response.write(data);
            response.end();
          }
       });
    } else if (request.url.substring(0, 10) == '/interface'){
            var params = mudUrl.parse(request.url, true);
            try{
                var id = params.query['id'];
                var name = params.query['name'];
                var wd = params.query['wd'];
                console.log("id = " + id + " name = " + name + " wd = " + wd);
                var jsonData = {};
                jsonData['code'] = 200;
                jsonData['key'] = "yes";
                var strJson = JSON.stringify(jsonData);
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write(strJson);
                response.end();
            }
            catch(error){
                console.log(error);
            }
            // console.log(params);
            // console.log(params.query);
        }
  }
}

console.log('Server running at http://127.0.0.1:8888/');
