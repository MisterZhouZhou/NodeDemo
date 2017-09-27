var fs = require('fs'),
    path = require('path'),
    http = require('http');

var config = require('../conf/config');

 var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

var server;

function main() {
       console.log('11');
    var  root = config.root || '.';
    var  port = config.port || 8888;
    console.log(config);
    server = http.createServer(function (request, response) {
       var urlInfo = parseURL(root, port, request.url);

       validateFiles(urlInfo.pathnames, function (err, pathnames) {
           if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames,response);
            }
       });
    }).listen(port);

    process.on('SIGTERM',function(){
      server.close(function(){
        process.exit(0);
      });
    })

    console.log('服务器运行于：localhost:8888/');
}

function validateFiles(pathnames, callback) {
   var output = [];
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function (err, stats) {
                if (err) {
                    callback(err);
                } else if(!stats.isFile()){
                    callback(new Error());
                }else{
                  next(i+1,len);
                }
            });
        } else {
            // 读出来的类型为buffer,
            callback(null, pathnames);
        }
    }(0, pathnames.length));
}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);
            reader.pipe(writer, { end: false });
            reader.on('end', function() {
                next(i + 1, len);
            });
        } else {
            writer.end();
        }
    }(0, pathnames.length));
}

function parseURL(root,port, url) {
   var base, pathnames, parts;
    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }
    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root,base, value);
    });
     return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}


main();
