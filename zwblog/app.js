var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 需要安装的插件
var session=require('express-session');
var partials = require('express-partials');
// 还有mongodb

var settings = require('./settings');


var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 支持页面片段
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(settings.cookieSecret));
// 存session
app.use(session({
    secret:settings.cookieSecret,
    cookie:{maxAge:1000*60*30},  //30分钟
    resave:false,
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
//登录以后，将user对象存入session，再交给response对象，用于页面显示
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.currentItem = req.session.currentItem;
    let success = req.session.success;
    let err = req.session.error;
    delete  req.session.success;
    delete  req.session.error;
    res.locals.message = "";
    if (success){
        res.locals.message = '<div id="alt_sucess" class="alert alert-success">'+ success +'</div>';
    }
    if (err){
        res.locals.message = '<div id="alt_warning" class="alert alert-warning">'+ err +'</div>';
    }
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
