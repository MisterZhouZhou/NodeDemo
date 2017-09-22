var urllib  = require('url');
var express = require('express');
var router = express.Router();
var httpUtil = require('../models/httpUtil');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 初始数据
var data = {
  status: '100',
  msg: '操作成功',
  data: {
    userId: '123456',
    userName: 'hgdqstudio',
    blog: 'http://hgdqstudio.online'
  }
};

/* GET home/index  */
router.get('/index',function(req,res,next){
  var params = urllib.parse(req.url,true).query;
  console.log(params);
  res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'});//设置response编码为utf-8
  res.end(JSON.stringify(data));
});


/* GET /picture  */
router.get('/picture',function(req,res,next){
  var params = urllib.parse(req.url,true).search;
  httpUtil.get('http://image.baidu.com/channel/listjson'+params ,req,res);
});


module.exports = router;
