var urllib  = require('url');
var express = require('express');
var router = express.Router();
var httpUtil = require('../models/httpUtil');

var baseURL = 'http://image.baidu.com/channel/listjson';

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
  res.end(JSON.stringify(data));
});


/* GET /picture  */
router.get('/picture',function(req,res,next){
  var params = urllib.parse(req.url,true).search;
  httpUtil.get('http://image.baidu.com/channel/listjson'+params ,req,res);
});

/* POST /picture  */
router.post('/picture',function(req,res,next){
  // var params = urllib.parse(req.url,true);
  httpUtil.get('http://image.baidu.com/channel/listjson?'+toQueryString(req.body) ,req,res);
  // res.end(JSON.stringify(req.body));
  // // console.log('http://image.baidu.com/channel/listjson?'+params);
  // httpUtil.post('http://image.baidu.com/channel/listjson', toQueryString(req.body) ,req,res);
});

 // 拼接参数
  function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  }

module.exports = router;
