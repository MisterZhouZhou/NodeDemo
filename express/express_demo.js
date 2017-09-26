var express = require('express');
var app = express();
var fs = require('fs');
var urllib = require('url');

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/',function(req,res){
   console.log("主页 GET 请求");
   res.send('Hello GET');
});

// post 请求
app.post('/',function(req,res){
   console.log("主页 POST 请求");
   res.send('Hello POST');
});

app.get('/index.html',function(req,res){
   res.sendFile(__dirname+"/"+"index.html");
});

app.get('/process_get', function (req, res) {
  var response = {
    "first_name": req.query.first_name,
    "last_name": req.query.last_name
  }
  console.log(response);
  res.end(JSON.stringify(response));
});


// 上传图片
app.get('/upload.html',function(req,res){
   res.sendFile(__dirname+"/"+"upload.html");
});

app.post('/file_upload',function(req,res){
   // var params = urllib.parse(req.url,true);
   console.log(JSON.stringify(req.body));  // 上传的文件信息
   // res.send('ddddd');
  // return res.redirect('http://www.baidu.com');
  res.send('22');

   // var des_file = __dirname + "/" + req.files[0].originalname;
   // fs.readFile( req.files[0].path, function (err, data) {
   //      fs.writeFile(des_file, data, function (err) {
   //       if( err ){
   //            console.log( err );
   //       }else{
   //             response = {
   //                 message:'File uploaded successfully',
   //                 filename:req.files[0].originalname
   //            };
   //        }
   //        console.log( response );
   //        res.end( JSON.stringify( response ) );
   //     });
   // });
});

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
});


//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

//  /list_user 页面 GET 请求
app.get('/listUsers', function (req, res) {
   fs.readFile(__dirname+"/public/jsons/"+"users.json", 'utf8', function (err, data) {
       if(err){
         console.log(err);
       }
       else{
         data = JSON.parse( data );
         data["user4"] = user["user4"];
         console.log( data );
         res.end( JSON.stringify(data));
       }
   });
});

app.get('/users/:id',function(req,res){
   fs.readFile(__dirname+"/public/jsons/"+"users.json", 'utf8', function (err, data) {
       if(err){
         console.log(err);
       }
       else{
         data = JSON.parse( data );
         var user = data['user'+req.params.id];
         console.log( user );
         res.end( JSON.stringify(user));
       }
   });
});

// 删除用户
app.get('/deleteUser/:id', function (req, res) {
   // First read existing users.
   fs.readFile(__dirname+"/public/jsons/"+"users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" +req.params.id];
       console.log( data );
       // 删除本地
       fs.writeFile(__dirname+"/public/jsons/"+"users.json", JSON.stringify(data) , function (err) {
         if( err ){
              console.log( err );
         }else{
           console.log('更新成功');
         }
       });

       res.end( JSON.stringify(data));
   });
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
});

var server = app.listen(8888, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
