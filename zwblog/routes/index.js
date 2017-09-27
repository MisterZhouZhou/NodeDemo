var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// method1
var DBHelp=require('../models/MongoDBHelper');

// method3
var mySqlDBHelper  = require('../models/MysqlDBHelper');


// method2
// var User=require("../models/User");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '欢迎页',layout: 'layout'});
});

// 注册
router.route('/register').all(Logined).get(function(req,res) {
    res.locals.currentItem = '注册';
    res.render('register',{title:'注册',layout: 'layout'});
}).post(function(req,res) {

    /*
     let newUser={username:req.body.username,password:req.body.password,passwordSec:req.body.passwordSec};
     let sqlStr2='select count(*) as count from users where username="'+newUser.username+'"';
     let dbhelp=new DBHelp();
     dbhelp.Find(sqlStr2,function(result)
     {
     if(result[0].count!=1)
     {
     if(newUser.password===newUser.passwordSec)
     {
     let sqlStr='insert into users(username,password) values(?,?)';
     let data=[newUser.username,newUser.password]
     dbhelp.Add(sqlStr,data,function()
     {
     req.session.error='注册成功，请登录！';
     return res.redirect('/login');
     });
     }
     else
     {
     req.session.error='两次密码不一致！';
     return res.redirect('/register');
     }
     }
     else
     {
     req.session.error='用户名已存在！';
     return res.redirect('/register');
     }
     });

    */
    let userName = req.body.txtUserName;
    let userPwd = req.body.txtUserPwd;
    let userRePwd = req.body.txtUserRePwd;

    let dbhelp=new DBHelp();
    dbhelp.FindOne('users',{username: userName},function(result) {
        if(!result){
            if(userPwd === userRePwd) {
                //准备添加到数据库的数据（数组格式）
                // 对密码进行加密
                md5 = crypto.createHash('md5');
                userPwd = md5.update(userPwd).digest('hex');
                let addStr=[{username:userName,password:userPwd}];
                dbhelp.Add('users',addStr,function() {
                    req.session.success = '注册成功，请登录！   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
                    return res.redirect('/login');
                });
            }else {
                req.session.error='两次密码不一致！';
                return res.redirect('/register');
            }
        }else {
            req.session.error='用户名已存在！';
            return res.redirect('/register');
        }
    });


    // method2
    // //声明需要添加的用户
    // User.find(newUser.username,function(err,user){
    //     if(!user){
    //         if(newUser.password === newUser.passwordSec) {
    //             // 不重新建立连接无法存储成功
    //             User.save({username: newUser.username, password: newUser.password},function(err) {
    //                 if (err) {
    //                     req.session.error = err;
    //                     return res.redirect("/");
    //                 }
    //                 req.session.error = '注册成功，请登录！';
    //                 return res.redirect('/login');
    //             });
    //         }else{
    //             req.session.error='两次密码不一致！';
    //             return res.redirect('/register');
    //         }
    //     }else {
    //         req.session.error='用户名已存在！';
    //         return res.redirect('/register');
    //     }
    // });
});

//响应login请求
//将错误提示信息存入session
router.route('/login').all(Logined).get(function(req,res) {
    res.locals.currentItem = '登录';
    res.render('login',{title:'登录',layout: 'layout'});
}).post(function(req,res) {
    /*
     let user={username:req.body.username,password:req.body.password};
     let sqlStr='select count(*) as count from users where username="'+user.username+'" and password="'+user.password+'"';
     let dbhelp=new mySqlDBHelper();
     dbhelp.Find(sqlStr,function(result)
     {
     if(result[0].count==1)
     {
     //出于安全，只把包含用户名存入session
     req.session.user={username:user.username};
     return res.redirect('/home');
     }
     else
     {
     req.session.error='用户名不存在或者密码错误！';
     return res.redirect('/login');
     }
     });
    */

    //因为还没有连接数据库，数据还是假的
    // let tempUser={username: req.body.txtUserName, password: req.body.txtUserPwd};
    let userName = req.body.txtUserName;
    let userPwd = req.body.txtUserPwd;
    let isRem = req.body['chbRem'];
        md5 = crypto.createHash('md5');
    userPwd = md5.update(userPwd).digest('hex');
    // 用于查询用户名是否存在
    let selectStr = {username: userName};
    let dbhelp = new DBHelp();
    dbhelp.FindOne('users',selectStr,function (result) {
        if(result){
            if(result.password == userPwd){
                if(isRem){
                    // 设置cookit30分钟
                    res.cookie('islogin', userName, { maxAge: 1000*60*30 });
                }
                // 出于安全，只把包含用户名的对象存入session
                req.session.user = selectStr;
                return res.redirect('/home');
            } else {
                req.session.error='用户名或者密码错误！';
                return res.redirect('/login');
            }
        }else {
            req.session.error = '账号不存在！';
            return res.redirect('/login');
        }
    });



    // method2
    // User.find(tempUser.username,function(err,user){
    //     if (err){
    //         console.log(err);
    //         return;
    //     }
    //     if(user){
    //         if(user.password == tempUser.password) {
    //             req.session.user=user;
    //             return res.redirect('/home');
    //         }else {
    //             req.session.error='用户名或者密码错误！';
    //             return res.redirect('/login');
    //         }
    //     }
    // });
});

//登录通过以后，进入Home页面//修改home路由，去掉声明user对象和向页面传递对象
router.route('/home').all(LoginFirst).get(function(req,res) {
    let selectStr = {};
    let dbhelp=new DBHelp();
    dbhelp.FindAllArticle('posts',selectStr,function(result) {
        if(result) {
            res.render('home',{title:'首页',posts:result,layout: 'layout'});
        } else {
            res.render('home',{title:'首页',layout: 'layout'});
        }
    });
});

// users
router.route('/users').get(function(req,res) {
    let selectStr = {username: 1,_id: 0};
    let dbhelp=new DBHelp();
    dbhelp.FindAll('users',selectStr,function(result) {
        if(result) {
            res.locals.currentItem = '首页';
            res.render('home',{title:'首页',allusers:result,layout: 'layout'});
        } else {
            res.render('users',{title:'用户',layout: 'layout'});
        }
    });
});

router.route('/user/:username').get(function(req,res) {
    let username = req.params.username;
    let selectStr = {username: username};
    let dbhelp = new DBHelp();
    dbhelp.FindOne('users',selectStr,function (user) {
        if(!user){
            req.session.error="用户不存在";
            return res.redirect("/home");
        }
        var query={};
        if(username){
            query.username=username;
        }
        dbhelp.FindArticle('posts', query, function (err,posts) {
            if(err){
                req.session.error=err;
                return req.redirect("/home");
            }
            res.render("user",{
                title:user.username,
                posts:posts,layout: 'layout'
            });
        });
    });
});

// post
router.route('/post').post(function(req,res) {
    let currentUser = req.session.user;
    let post = req.body.post;
    var postStr={
        username: currentUser.username,
        post: post,
        time: new Date()
    }
    let dbhelp=new DBHelp();
    dbhelp.AddArticle('posts',postStr,function(result) {
        if(!result) {
            req.session.success = "发表成功";
            return res.redirect('/user/'+currentUser.name);
        } else {
            req.session.error = result;
            return res.redirect('/home');
        }
    });
});


//修改logout路由，注销时，清空session
router.get('/logout',function(req,res) {
    req.session.user = null;
    return res.redirect('/');
});

// 删除
router.route('/delete/:URLusername').get(function (req,res) {
    /*
     let reqUsername=req.params.URLusername;
     if(reqUsername!==req.session.user.username)
     {

     let sqlStr='delete from users where username="'+reqUsername+'"';
     let dbhelp=new DBHelp();
     dbhelp.Delete(sqlStr,function()
     {
     req.session.error='移除用户 '+reqUsername+' 成功！';
     return res.redirect('/home');
     });
     }
     else
     {
     req.session.error="不能操作当前登录用户！";
     return res.redirect('/home');
     }
    */
    if(req.params.URLusername !== req.session.user.username){
        let whereStr={username:req.params.URLusername};
        let dbhelp=new DBHelp();
        dbhelp.Delete('users',whereStr,function() {
            req.session.error='移除用户 '+whereStr.username+' 成功！';
            return res.redirect('/home');
        });
    }else{
        req.session.error="不能操作当前登录用户！";
        return res.redirect('/home');
    }
});

// 重置密码
router.get('/resetPwd/:URLusername',function(req,res) {

    /*
     let reqUsername=req.params.URLusername;
     if(reqUsername!==req.session.user.username)
     {
     let sqlStr='update users set password=? where username=?';
     let data=['123456',reqUsername];
     let dbhelp=new DBHelp();
     dbhelp.Update(sqlStr,data,function()
     {
     req.session.error=reqUsername+' 的密码已重置为 123456！';
     return res.redirect('/home');
     });
     }
     else
     {
     req.session.error="不能操作当前登录用户！";
     return res.redirect('/home');
     }
    */

    if(req.params.URLusername!==req.session.user.username) {
        let whereStr={username:req.params.URLusername};
        let update={$set:{password:'123456'}};
        let dbhelp=new DBHelp();
        dbhelp.Update('users',whereStr,update,function() {
            req.session.error = whereStr.username + ' 的密码已重置为 123456！';
            return res.redirect('/home');
        });
    }
    else {
        req.session.error="不能操作当前登录用户！";
        return res.redirect('/home');
    }
});

function Logined(req,res,next) {
    if(req.session.user) {
        // req.session.error='您已登录！';
        return res.redirect('/home');
    }
    next();
}

function LoginFirst(req,res,next) {
    console.log(req.cookies.islogin);
    if(req.cookies.islogin) {
        req.session.user = {username: req.cookies.islogin};
    }
    // if(!req.session.user) {
    //     req.session.error='请先登录!';
    //     return res.redirect('/login');
    // }
    next();
}


module.exports = router;
