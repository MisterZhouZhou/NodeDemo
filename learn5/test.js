var express       = require('express');
var bodyParse     = require('body-parser');
var cookieParser  = require('cookie-parser');
var app           = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParse.urlencoded({extended:false}));


// 处理根目录请求
// 1
app.get('/',function(req,res){
  res.sendfile('public/main.html');
  console.log('main page is required');
});

//2
app.get('/main',function(req,res){
  res.sendfile('public/main.html');
  console.log('main page is required');
});

//3
// app.get('/main.html',function(req,res){
//   console.log(__dirname+"/"+"main.html");
//   res.sendFile(__dirname+"/"+"main.html");
//   console.log('main page is required');
// });

// 处理/login的get请求
app.get('/add',function(req,res){
  res.sendfile('public/add.html');
  console.log('add page is required');
});

// 处理/login的post请求
app.post('/login',function(req,res){
  name = req.body.name;
  pwd  = req.body.pwd;
  console.log(name+'--'+pwd);
  res.status(200).send(name+'--'+pwd);
});

// 监听端口
var server = app.listen(3000);
