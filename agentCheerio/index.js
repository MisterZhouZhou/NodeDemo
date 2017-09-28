// var http = require('http');
// var superagent = require('superagent');
// var cheerio    = require('cheerio');


// function getData(res){
//   // 用 superagent 去抓取 https://cnodejs.org/ 的内容
//   superagent.get('https://cnodejs.org/')
//   .end(function (err, sres) {
//       // 常规的错误处理
//       if (err) {
//          // console.log(err);
//          res.end(JSON.stringify(err)); ;
//       }
//        var $ = cheerio.load(sres.text);
//        var items = [];
//         $('#topic_list .topic_title').each(function (idx, element) {
//             var $element = $(element);
//             items.push({
//               title: $element.attr('title'),
//               href: $element.attr('href')
//             });
//         });

//         res.end(JSON.stringify(items));
//    });
// }

// http.createServer(function(req,res){
//    // req.setEncoding('utf8');//请求编码
//     res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
//    getData(res);
// }).listen(8000);
// console.log('服务器运行于：127.0.0.1:8000');


var http = require('http');
var superagent = require('superagent');
var cheerio = require('cheerio');
var events = require('events');

var emitter = new events.EventEmitter();
var srcHost = 'https://cnodejs.org';

var items = [];
var titleAry = [];
var indexPage = null;
var curIndex = 0;


emitter.on('childEvnts', function(data){

    var $element = indexPage(titleAry[curIndex]);
    var $ = cheerio.load(data.text);
    var curContext = $("#main .markdown-text");
     items.push({
        title : $element.attr('title'),
        href :   srcHost + $element.attr('href'),
        context : $(curContext[0]).text()
    });
    console.log(curIndex, items.length);
    if (items.length === titleAry.length)
        emitter.emit("End");
    else {
        curIndex++;
        console.log(indexPage(titleAry[curIndex]).attr('href'));
        ownGet(srcHost + indexPage(titleAry[curIndex]).attr('href'));
    }
});

// 获取文章详情
function ownGet (url, res) {
    superagent.get(url)
        .end(function(err, articleData) {
            if (err){
                console.log(err.message);
                return;
            }
            emitter.emit('childEvnts', articleData);
        });
}

function getTitleList(url,res){
  superagent.get(url)
        .end(function(err, data){
            if (err) {
                return;
            }
            var $ = cheerio.load(data.text);
            indexPage = $;
            titleAry = $("#topic_list .topic_title");
            var $element = $(titleAry[0]);
            ownGet(srcHost + $element.attr('href'),res);
        });
}

http.createServer(function(req,res){
   res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
    if (items.length !== 0){
        res.end(JSON.stringify(items));
        return;
    }
    getTitleList(srcHost, res);
    // (function(res){
        emitter.on('End', function(){
            res.end(JSON.stringify(items));
        });
    // })(res);
}).listen(8000);
console.log('服务器运行于：127.0.0.1:8000');
