var http = require('http');
var superagent = require('superagent');
var cheerio    = require('cheerio');


function getData(res){
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
  .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
         // console.log(err);
         res.end(JSON.stringify(err)); ;
      }
       var $ = cheerio.load(sres.text);
       var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
              title: $element.attr('title'),
              href: $element.attr('href')
            });
        });

        res.end(JSON.stringify(items));
   });
}

http.createServer(function(req,res){
   // req.setEncoding('utf8');//请求编码
    res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
   getData(res);
}).listen(8000);
console.log('服务器运行于：127.0.0.1:8000');



