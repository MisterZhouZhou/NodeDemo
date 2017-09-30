/**
 * Created by zhouwei on 2017/9/24.
 */
//引入连接配置的模块
// var settings = require('../settings');
var mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zw123456',  //填自己mysql数据库的密码
    port: '3306',
    database: 'nodesample'
});


//引入数据库操作模块
function MysqlDBHelper() {}

/**************************
 *
 * 功能：查询
 * 参数：sqlStr(SQL语句)、callback(回调函数)
 *
 **************************/
MysqlDBHelper.prototype.Find = function(sqlStr,callback) {
    connection = mysql.createConnection(connection.config);
    connection.connect();
    connection.query(sqlStr,function(err,result) {
        if(err) {
            console.log(err);
            return;
        }
        callback(result);
        /*
         result是数组对象,类似：[RowDataPacket{username:'fuzq'},RowDataPacket{username:'admin'}]
         */
    });
    connection.end();
};

/**************************
 *
 * 功能：添加
 * 参数：sqlStr(SQL语句)、data(添加的数据)、callback(回调函数)
 *
 **************************/
MysqlDBHelper.prototype.Add=function(sqlStr,data,callback) {
    connection=mysql.createConnection(connection.config);
    connection.connect();
    connection.query(sqlStr,data,function(err) {
        if(err) {
            console.log(err);
            return;
        }
        callback();
    });
    connection.end();
};


/**************************
 *
 * 功能：删除
 * 参数：sqlStr(SQL语句)、callback(回调函数)
 *
 **************************/
MysqlDBHelper.prototype.Delete=function(sqlStr,callback)
{
    connection=mysql.createConnection(connection.config);
    connection.connect();
    connection.query(sqlStr,function(err)
    {
        if(err)
        {
            console.log(err);
            return;
        }
        callback();
    });
    connection.end();
};


/**************************
 *
 * 功能：修改
 * 参数：sqlStr(SQL语句)、data(修改的数据)、callback(回调函数)
 *
 **************************/
MysqlDBHelper.prototype.Update=function(sqlStr,data,callback)
{
    connection=mysql.createConnection(connection.config);
    connection.connect();
    connection.query(sqlStr,data,function(err)
    {
        if(err)
        {
            console.log(err);
            return;
        }
        callback();
    });
    connection.end();
};
module.exports = MysqlDBHelper;
