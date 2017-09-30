var img_gallery = require('./img.gallery.js');
var http = require("http");
var iconv = require('iconv-lite');
var cheerio = require("cheerio");

var url = 'http://news.qq.com/a/20160512/009639.htm';
var url = 'http://news.qq.com/a/20160512/009639.hdBigPic.js';

var SpiderQQImgs = function() {
  this.title = null;
  this.imgGallery = null;
  this.callback = null;
};

SpiderQQImgs.prototype.RegExp = /http:\/\/news.qq.com\/a\/\d{8}\/\d+.htm/;

SpiderQQImgs.prototype.send2callback = function() {
  if ((typeof this.title =='string')&&this.title.constructor==String && this.title.length > 0 && this.imgGallery != null && Object.prototype.toString.call(this.callback)=== '[object Function]') {
    this.imgGallery.title = this.title;
        this.callback(null, this.imgGallery);
    }
};

SpiderQQImgs.prototype.spider = function (url, callback) {
  this.callback = callback;

  this.spiderTitle(url);

  url = url.replace('.htm', '.hdBigPic.js');
  this.spiderImgGallery(url);
};


SpiderQQImgs.prototype.spiderTitle = function (url) {
  var spider = this;
  http.get(url, function(res){
    var arrBuf = [];
    var bufLength = 0;
    res.on("data", function(chunk){
      arrBuf.push(chunk);
      bufLength += chunk.length;
    })
    .on("end", function(){
      var chunkAll = Buffer.concat(arrBuf, bufLength);

      var html = iconv.decode(chunkAll,'gb2312');

      var $ = cheerio.load(html);
      spider.title = $("title").text();
      //console.log('page title', spider.title);
      spider.send2callback();
    });
  });
};


SpiderQQImgs.prototype.spiderImgGallery = function (url) {
  var spider = this;
  http.get(url, function(res){
    var arrBuf = [];
    var bufLength = 0;
    res.on("data", function(chunk){
      arrBuf.push(chunk);
      bufLength += chunk.length;
    })
    .on("end", function(){
      var imgGallery = new img_gallery(url);

      var chunkAll = Buffer.concat(arrBuf, bufLength);

      var strJson = iconv.decode(chunkAll,'gb2312') // 汉字不乱码
              .replace(/\/\*[\s\S]+?\*\//,'')/*.replace(subfix, '')*/ // 删除掉注释
              .replace(/\'/g, '"') // 单引号变双引号才能解析成Object
              /*.replace(/&nbsp;/g, '')
              .replace(/"Content":"",/g, '').replace(/"Attributes":\[\],/g, '')
              .replace(/ /g, '')
              .replace(/,"Children":\[\]/g,"")*/;

      // console.log(strJson);

      var objJson = JSON.parse(strJson);

      deleteEmptyProperty(objJson);

      var arr = objJson.Children[0].Children;
      var shift1 = arr.shift();
      var imgCount = shift1.Children[0].Content;
      var arrImgs = arr.shift().Children;

      // console.log('imgCount', imgCount);

      arrImgs.forEach((element, index, array) => {
        var arr = element.Children;
        var small = arr[1];
        var smallUrl = small.Children[0].Content;

        var big = arr[2];
        var bigUrl = big.Children[0].Content;

        var text = arr[3];
        var strText = text.Children[0].Content;

        /*console.log('index', index);
        console.log('smallUrl', smallUrl);
        console.log('bigUrl', bigUrl);
        console.log('text', strText);*/

        imgGallery.push(index, bigUrl, smallUrl, strText);
      });

      spider.imgGallery = imgGallery;
      spider.send2callback();
     });
  });
};



function deleteEmptyProperty(object){
    for (var i in object) {
        var value = object[i];
        // console.log('typeof object[' + i + ']', (typeof value));
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length == 0) {
                    delete object[i];
                    //console.log('delete Array', i);
                    continue;
                }
            }

            deleteEmptyProperty(value);

            if (isEmpty(value)) {
                //console.log('isOwnEmpty true', i, value);
                delete object[i];
                //console.log('delete a empty object');
            }
        } else {
            if (value === '' || value === null || value === undefined) {
                delete object[i];
                //console.log('delete ', i);
            } else {
                //console.log('check ', i, value);
            }
        }
    }
}


function isEmpty(object) {
    for (var name in object) {
        return false;
    }
    return true;
}


module.exports = SpiderQQImgs;
