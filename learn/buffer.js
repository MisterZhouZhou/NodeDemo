// var buf = new Buffer(256);
// var len = buf.write('zw','utf8');

// console.log("写入字节数 : "+  len);
// console.log("读字节数 : "+  buf.toString('utf8'));


// var buf = new Buffer('www.baidu.com');
// var json = buf.toJSON(buf);
// console.log(json);



var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
