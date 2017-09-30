var ImgGallery = function(url) {
  this.url = url;
  this.title = '';
  this.arrImgs = [];
};

ImgGallery.prototype.push = function(idx, imgBig, imgSmall, desc) {
  var img = new Img(idx, imgBig, imgSmall, desc);
  var length = this.arrImgs.push(img);
  return length;
}

var Img = function(idx, imgBig, imgSmall, desc) {
  this.imgBig = imgBig;
  this.imgSmall = imgSmall;
  this.desc = desc;
  this.index = idx;
};




module.exports = ImgGallery;
