var http = require('http');
var superagent = require('superagent');
var cheerio    = require('cheerio');
var DBHelp     = require('./MysqlDBHelper');

//  ***********   method1    ***********
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
//               href: 'https://cnodejs.org'+$element.attr('href')
//             });
//         });
//         let dbhelp=new DBHelp();
//         items.forEach((val)=>{
//           let sqlStr='insert into topics(title,url) values(?,?)';
//           let data=[val.title,val.href]
//           dbhelp.Add(sqlStr,data,function(){
//              // res.end(JSON.stringify(val));
//           });
//         });
//    });
// }

// http.createServer(function(req,res){
//    // req.setEncoding('utf8');//请求编码
//     res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
//    // 插入数据
//    // getData(res);
//    let dbhelp=new DBHelp();
//    // 查询数据
//    let sqlStr='select * from topics';
//    dbhelp.Find(sqlStr,function(result){
//        res.end(JSON.stringify(result));
//    });

// }).listen(8000);
// console.log('服务器运行于：127.0.0.1:8000');




//  ***********   method2    ***********
// var http = require('http');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var events = require('events');

// var emitter = new events.EventEmitter();
// var srcHost = 'https://cnodejs.org';

// var items = [];
// var titleAry = [];
// var indexPage = null;
// var curIndex = 0;


// emitter.on('childEvnts', function(data){

//     var $element = indexPage(titleAry[curIndex]);
//     var $ = cheerio.load(data.text);
//     var curContext = $("#main .markdown-text");
//      items.push({
//         title : $element.attr('title'),
//         href :   srcHost + $element.attr('href'),
//         context : $(curContext[0]).text()
//     });
//     console.log(curIndex, items.length);
//     if (items.length === titleAry.length)
//         emitter.emit("End");
//     else {
//         curIndex++;
//         console.log(indexPage(titleAry[curIndex]).attr('href'));
//         ownGet(srcHost + indexPage(titleAry[curIndex]).attr('href'));
//     }
// });

// // 获取文章详情
// function ownGet (url, res) {
//     superagent.get(url)
//         .end(function(err, articleData) {
//             if (err){
//                 console.log(err.message);
//                 return;
//             }
//             emitter.emit('childEvnts', articleData);
//         });
// }

// function getTitleList(url,res){
//   superagent.get(url)
//         .end(function(err, data){
//             if (err) {
//                 return;
//             }
//             var $ = cheerio.load(data.text);
//             indexPage = $;
//             titleAry = $("#topic_list .topic_title");
//             var $element = $(titleAry[0]);
//             ownGet(srcHost + $element.attr('href'),res);
//         });
// }

// http.createServer(function(req,res){
//    res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
//     if (items.length !== 0){
//         res.end(JSON.stringify(items));
//         return;
//     }
//     getTitleList(srcHost, res);
//     // (function(res){
//         emitter.on('End', function(){
//             res.end(JSON.stringify(items));
//         });
//     // })(res);
// }).listen(8000);
// console.log('服务器运行于：127.0.0.1:8000');





//  ***********   拉取空间动态    ***********
http.createServer(function(req,res){
   res.setHeader('content-type','text/plain; charset=UTF-8');//响应编码，如果是html,写在head中也可以
   let qq = "2861451012";
   let startIndex = 1; // 开始页数
   let num = 10; // 每页条数
   let url = "http://taotao.qq.com/cgi-bin/emotion_cgi_homepage_msg?owneruin="+qq+"&start=" + startIndex + "&num="+num+"&format=jsonp";
   superagent.get(url)
           .end(function(err, dymList) {
                if (err){
                    console.log(err.message);
                    return;
                }
                let data = dymList.text;
                var json = JSON.parse(data.slice(10, -2));
                res.end(JSON.stringify(json));
            });
}).listen(8000);
console.log('服务器运行于：127.0.0.1:8000');

