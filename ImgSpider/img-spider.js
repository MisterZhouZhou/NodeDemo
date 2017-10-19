var ifengImgs = require('./ifengImgs.js');
var ifengPictures = require('./ifengPictures.js');
var qqImgs = require('./qqImgs.js');

var ImgSpider = function(){
    this.arrUrls = [];
    this.arrImgGallery = [];
    this.callback = null;
};

ImgSpider.prototype.spider = function(arrUrl, callback){
  if(!Array.isArray(arrUrl)){
    throw new Error("arrUrl isn't a array!");
  }
  if(arrUrl.length == 0){
    throw new Error("arrUrl is empty.");
  }
  this.callback = callback;
   arrUrl.forEach((element, index, arr) => {
      if (ifengImgs.prototype.RegExp.test(element)) {
        runSpider(element, ifengImgs, this);
      } else if (ifengPictures.prototype.RegExp.test(element)) {
        runSpider(element, ifengPictures, this);
      } else if (qqImgs.prototype.RegExp.test(element)) {
        runSpider(element, qqImgs, this);
      } else {
        element = element.trim();
        if (element.length > 0) {
          var err = new Error("Can't support this url:[" + element + ']');
          callback(err, null);
        } else {
          // do nothing..
        }
      }
   });
}

ImgSpider.prototype.clean = function () {
  this.arrUrls = [];
  this.arrImgGallery = [];
  this.callback = null;
};


function runSpider(url, constructor, imgSpider) {
  imgSpider.arrUrls.push(url);
  spider = new constructor();
  spider.spider(url, (err, imgGallery) => {
    if (err) {
      console.log('error');
      console.log(err);
      return;
    }
    console.log('Done:', imgGallery.url, imgGallery.title);
    imgSpider.arrImgGallery.push(imgGallery);

    if (imgSpider.arrImgGallery.length == imgSpider.arrUrls.length) {
      if (Object.prototype.toString.call(imgSpider.callback)=== '[object Function]') {
        imgSpider.callback(null, imgSpider.arrImgGallery);
      }
    }

  });
}

module.exports = ImgSpider;

