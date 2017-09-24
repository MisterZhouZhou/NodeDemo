/**
 * Created by zhouwei on 2017/9/24.
 */
//引入连接配置的模块
var settings = require('../settings');
//引入模块，声明连接字符串
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://'+ settings.host +':27017/'+ settings.db;
//创建连接对象并暴漏给你接口
module.exports = {
    MongoClient,
    DB_CONN_STR
}
