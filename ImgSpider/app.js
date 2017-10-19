var fs = require('fs');
var express = require('express');
var img_spider = require('./img-spider.js');
var app = express();


app.get('/imgs.html', (req, resp) => {
  resp.writeHead(200, {'Content-Type' : 'text/html'});
  resp.write('<head><meta charset="utf-8"/></head>');
  var file = fs.createReadStream('./imgs.html');
  file.pipe(resp);

});

app.post('/imgs.html', (req, resp) => {
  req.on('data', (data) => {
    var content = data.toString();
    content = unescape(content);
    content = content.replace('txtUrls=', '')
      //.replace('/\r/g','')
      //.replace('/\\r/g','')
    ;
    var arrUrl = content.split(/\s+/);
    var imgSpider = new img_spider();
    imgSpider.spider(arrUrl, (err, arrImgGallery) => {

      resp.writeHead(200, {'Content-Type' : 'text/html'});
      resp.write('<head><meta charset="utf-8"/></head>');
      resp.write('<body>');
      if (err) {
        var errStr = err.toString();
        resp.write(errStr);
        resp.write('</body>');
        resp.end();
        return;
      }
      arrImgGallery.forEach((element, index, arrGallery)=>{
        var gallery = element;

        resp.write('<p>============================================</p>');
        resp.write('<p>' + gallery.title + '</p>');
        var arrImgs = gallery.arrImgs;
        arrImgs.forEach((ele, idx, arrImg)=>{
          var desc = ele.desc;
          var imgUrl = ele.imgBig;
          resp.write('<p>idx=' + idx + "</p>");
          resp.write('<p>' + desc + '</p>');
          //<img id="bigPic" src="http://img1.gtimg.com/16/1615/161596/16159645_980x1200_0.jpg" style="opacity: 1;">
          resp.write('<p><img id="bigPic" src="' + imgUrl+'" style="opacity: 1;"></img></p>');
          resp.write('<p>------------------------</p>');
        });
      });
      resp.write('</body>');
      resp.end();
    });
  });
});



app.listen(1024);
console.log('server running on http://localhost:1024/imgs.html');
