var url = 'http://games.ifeng.com/picture/gaoqing/detail_2015_09/11/41081883_0.shtml';

var cheerio = require("cheerio");
var http = require("http");
var iconv = require('iconv-lite');
var img_gallery = require('./img.gallery.js');

var SpiderIfengPictures = function(){

};


SpiderIfengPictures.prototype.RegExp =  /http:\/\/games.ifeng.com\/picture\/gaoqing\/detail_\d{4}_\d{2}\/\d{2}\/\d+_\d+.shtml/;

SpiderIfengPictures.prototype.spider = function (strUrl, callback) {
  http.get(strUrl, function(res){
    var arrBuf = [];
    var bufLength = 0;
    res.on("data", function(chunk){
      arrBuf.push(chunk);
      bufLength += chunk.length;
    })
    .on("end", function(){
      var imgGallery = new img_gallery(strUrl);

      var chunkAll = Buffer.concat(arrBuf, bufLength);

      var html = iconv.decode(chunkAll,'utf-8');
      console.log('-----------------------------------');
      console.log('html', html);
      var $ = cheerio.load(html);
      imgGallery.title = $("title").text();
      //console.log('page title', imgGallery.title);


      var strStart = '_listdata[0] = ';
      var strEnd = 'new ifeng.Gallery';
      var idxStart = html.indexOf(strStart);
      var idxEnd = html.indexOf(strEnd, strStart.length + idxStart);
      var jsListData = html.slice(idxStart + strStart.length, idxEnd);

      jsListData = jsListData.replace(/'/g, "\"")
          .replace(/title/g, '\"title\"')
          .replace(/morelink/g, '\"morelink\"')
          .replace(/picwidth/g, '\"picwidth\"')
          .replace(/picheight/g, '\"picheight\"')
          .replace(/listimg/g, '\"listimg\"')
          .replace(/timg:/g, '\"timg\":')
          .replace(/img:/g, '\"img\":')
          .replace(/\};_listdata\[\d*\] = /g, '},')
          .replace('\};', '}')
        ;
      jsListData = '[' + jsListData + ']';
      var objJson = JSON.parse(jsListData);

      //console.log('jsListData', jsListData);
      objJson.forEach((element, index, arr) => {
        var title = element.title;
        var timg = element.timg;
        var img = element.img;
        var listimg = element.listimg;

        imgGallery.push(index, timg, img, title);
        /*console.log(index);
        console.log('title', title);
        console.log('timg', timg);
        console.log('img', img);
        console.log('listimg', listimg);*/
      });

      if (Object.prototype.toString.call(callback)=== '[object Function]') {
                callback(null, imgGallery);
            }
    });
  });

};

module.exports = SpiderIfengPictures;
