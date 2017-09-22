// var buf = new Buffer(256);
// var len = buf.write('www.runoob.com');
// console.log('写入字节数：'+len);
// var json = buf.toJSON(buf)

// console.log(json);




var buf = new Buffer('www.runoob.com');
var json = buf.toJSON(buf);

console.log(json);
