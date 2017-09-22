// var fs = require("fs");
// var data = '';

// var readerStream = fs.createReadStream('input.txt');
// readerStream.setEncoding('UTF8');

// readerStream.on('data',function(chunk){
//   data += chunk;
// });

// readerStream.on('end',function(){
//   console.log(data);
// });

// readerStream.on('error', function(err){
//   console.log(err.stack);
// });
// console.log("程序执行完毕");




// 写入流
var fs = require('fs');
var data = '菜鸟教程官网地址：www.runoob.com';

var writeStream = fs.createWriteStream('output.txt');
writeStream.write(data,'UTF8');
writeStream.end();
writeStream.on('finish',function(){
  console.log('写入完成');
});
writeStream.on('error',function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");









