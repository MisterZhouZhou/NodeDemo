var http = require('http');
var fs = require('fs');

var ccap = require('ccap')();//Instantiated ccap class

http.createServer(function (request, response) {

    if(request.url == '/favicon.ico')return response.end('');//Intercept request favicon.ico

    console.log(request.url);
    if(request.url == '/getBuffer'){
      var ary = ccap.get();

      var txt = ary[0];

      var buf = ary[1];

      response.end(buf);

      console.log(txt);

      let originBuffer = buf;
       // 生成图片2(把buffer写入到图片文件)
      fs.writeFile('./avatar2.jpg', originBuffer, function(err) {
          if(err) {console.log(err)}
      });

      var base64Img = originBuffer.toString('base64');  // base64图片编码字符串

      // console.log(base64Img);

      var decodeImg = new Buffer(base64Img, 'base64');  // new Buffer(string, encoding)

      // console.log(Buffer.compare(originBuffer, decodeImg));  // 0 表示一样


      // 生成图片3(把base64位图片编码写入到图片文件)
      fs.writeFile('./avatar3.jpg', decodeImg, function(err) {
          if(err) {console.log(err)}
      });
    }else if(request.url == '/getImage'){
      var content =  fs.readFileSync('./avatar2.jpg',"binary");   //格式必须为 binary 否则会出错
      response.write(content,"binary"); //格式必须为 binary，否则会出错
    }
    else if(request.url == '/avatar2.jpg'){
      // var content =  fs.readFileSync('./avatar2.jpg',"binary");   //格式必须为 binary 否则会出错
      // response.write(content,"binary"); //格式必须为 binary，否则会出错

      var ary = ccap.get();

      var txt = ary[0];

      var buf = ary[1];

      response.end(buf);

      console.log(txt);

    }




}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
