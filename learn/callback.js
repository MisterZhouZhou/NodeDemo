
var fs = require("fs");
fs.readFile('input.txt', function(err,data){
  if(err){
    return console.error(err);
  }
  console.log(data.toString());
});
console.log("程序执行结束!");



// var fs = require("fs");
// 阻塞代码
// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
// console.log("程序执行结束!");


