/* dns解析模块 */
var querystring = require("querystring"),
    url = require("url"),
    dns = require('dns');
exports.parseDns = function(res, req){
  var postData = "";
   postData = querystring.parse(url.parse(req.url).query);
   // url.parse(req.url,true).query 与上面等同
   getDns(postData,function(domain,addresses){
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end(JSON.stringify({
            domain: domain,
            addresses: addresses.join(',')
        }));
    });
}

function getDns(postData,callback){
    var domain = postData.search_dns;
    dns.resolve(domain, function(err, addresses){
        if(!addresses){
            addresses=['Not Exist !']
        }
        callback(domain, addresses);
    });
}
