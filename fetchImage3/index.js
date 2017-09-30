var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');

var options = [];  //用于存储网址链接的数组
var n=0;


//先生称图片地址链接的数组
for (var i = 1319; i <1329; i++) {
    var obj = {
        url: 'http://jandan.net/ooxx/page-' + i,
        headers:{
            'User-Agent': 'request'
        }
    }
    options.push(obj);
}


//用来处理这个调用逻辑的总函数
function all(err, res, body) {
    var $ = cheerio.load(body);
    n=n+$(".commentlist img").length;
    console.log(n);
    $(".commentlist img").each(function (i, ele) {
        var imgsrc = 'http:' + $(this).attr('src');
        var fileName = FileName(imgsrc.toString());
        //下载文件操作
        downloadImg(imgsrc, fileName, function () {
            console.log(fileName + 'upload 完成');
        });
    })
}
//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}



//利用async的mapLimit方法实现限定并发数为3的调用
async.mapLimit(options,3, function (option, callback) {
    request(option, all);
    callback(null);
}, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        // console.log(result);
        console.log('全部检索完毕');
    }
})
