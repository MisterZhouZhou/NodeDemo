var url = 'http://games.ifeng.com/a/20160504/41603363_0.shtml';

var cheerio = require("cheerio");
var http = require("http");
var iconv = require('iconv-lite');
var img_gallery = require('./img.gallery.js');

var SpiderIfengImgs = function() {

};

//                                             http://games.ifeng.com/a/20160504/41603363_0.shtml
//                                             http://fashion.ifeng.com/a/20160519/40162307_0.shtml#p=1
SpiderIfengImgs.prototype.RegExp = /http:\/\/(games)|(fashion).ifeng.com\/a\/\d{8}\/\d+_\d+.shtml/;

SpiderIfengImgs.prototype.spider = function(url, callback){
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

            var html = iconv.decode(chunkAll,'utf-8');

            var $ = cheerio.load(html);
            imgGallery.title = $("title").text();
            //console.log('page title', imgGallery.title);


            var strStart = 'var G_listdata= ';
            var strEnd = '</script>';
            var idxStart = html.indexOf(strStart);
            var idxEnd = html.indexOf(strEnd, strStart.length + idxStart);
            var jsListData = html.slice(idxStart + strStart.length, idxEnd);
            jsListData = jsListData.replace(/'/g, "\"")
                    .replace(/title/g, '\"title\"')
                    .replace(/big_img/g, '\"big_img\"')
                    .replace(/originalimg/g, '\"originalimg\"')
                    .replace(/picwidth/g, '\"picwidth\"')
                    .replace(/picheight/g, '\"picheight\"')
                    .replace(/morelink/g, '\"morelink\"')
                    .replace(/img:/g, '\"img\":')
                    .replace('];', ']')
                ;
            var objJson = JSON.parse(jsListData);


            objJson.forEach((element, index, arr) => {

                var title = element.title;
                var big = element.big_img;
                var img = element.img;
                var originalimg = element.originalimg;

                imgGallery.push(index, big, img, title);

                /*console.log(index);
                console.log('title', title);
                console.log('big', big);
                console.log('img', img);
                console.log('originalimg', originalimg);*/
            });

            if (Object.prototype.toString.call(callback)=== '[object Function]') {
                callback(null, imgGallery);
            }

        });
    });

};


module.exports = SpiderIfengImgs;
