//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");  // 用来解析html非常方便，就像在浏览器中使用jquery一样
var mkdirp = require('mkdirp');    // 模块用来创建目录
var async = require('async');      // 异步操作

// 目标网址
var baseUrl = 'http://desk.zol.com.cn/meinv/1920x1080/';
// 本地存储目录
var dir = './images';
// 网站地址
var sites = [];
// 图片链接地址
var links = [];
// 记录图片的数量
var imageIndex = 1;

// 创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});

for(var i = 1;i<4;i++){
  let url = baseUrl + i + '.html';
  sites.push(url);
}



function start(urls){
   async.mapSeries(urls, function(item, callback) {
      loadData(item);
      // 下载完成一张再执行下一张图片的下载
      callback(null, item);
  }, function(err, results) {});
}

function loadData(url){
  // 发送请求, 会默认调用
  request(url, function(error, response, body) {
      if(!error && response.statusCode == 200) {
          var $ = cheerio.load(body);
          $('.photo-list-padding a img').each(function() {
              var src = $(this).attr('src');
              src = src.replace(/t_s208x130c5/, 't_s960x600c5');
              links.push(src);
          });
          // 每次只执行一个异步操作
          async.mapSeries(links, function(item, callback) {
              console.log('正在下载第'+imageIndex+'张');
              download(item, dir, imageIndex + item.substr(-4,4));
              console.log('第'+imageIndex+'张下载完成');
              imageIndex ++;
              // 下载完成一张再执行下一张图片的下载
              callback(null, item);
          }, function(err, results) {});
      }
  });
}



// 下载方法
var download = function(url, dir, filename){
  request.head(url, function(err, res, body){
      request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  });
};


// 启动程序
start(sites);
