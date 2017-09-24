/**
 * Created by zhouwei on 2017/9/24.
 */
//引入数据库操作模块
var mongodb = require("./Mongodb");
// //引入连接配置的模块
// var settings = require('../settings');
// //引入模块，声明连接字符串
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://'+ settings.host +':27017/'+ settings.db;
//声明User类
function User(user){
    this.username = user.username;
    this.password = user.password;
};

/**
 * 增加查询用户静态方法
 * @param username 用户名
 * @param callback
 */
User.find = function (username,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection) {
            if(err){
                db.close();
                return callback(err);
            }
            //查找name属性为usename的文档
            collection.findOne({username:username},function(err,result){
                if (err){
                    db.close();
                    return callback(err);
                }
                if(result){
                    //封装文档为User对象
                    var user = new User(result);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
                db.close();
            })
        });
    });
}

/**
 *使用原型增加保存方法
 * @param callback
 */
User.save = function(user,callback){
   // 存入monggodb的文档
   let addStr= {username: user.username,password: user.password};;
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
    //读取users集合
    db.collection("users",function(err,collection){
        if(err){
            db.close();
            return callback(err);
        }
        collection('users').insert([addStr],{safe: true},function (err) {
            db.close();
            return callback(err);
        });
    });
   });
}

//将User类给予接口
module.exports = User;
