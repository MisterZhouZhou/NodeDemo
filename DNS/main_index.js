/* 处理首页逻辑信息 */
var fs = require('fs'),
    url = require('url');
exports.goIndex = function(res, req){
  var readPath = __dirname + '/' +url.parse('index.html').pathname;
  console.log(url.parse('index.html').pathname);
  var indexPage = fs.readFileSync(readPath);
  /* 返回 */
  res.end(indexPage);
}
