/**
 * Created by zhouwei on 2017/9/24.
 */
//引入数据库操作模块
var mongodb = require("./Mongodb");
function MongoDBHelper() {}

/**************************
 *
 * 功能：条件查询，返回遇到的第一条符合条件的数据
 * 参数：tableName(查询的表名)、selectStr(查询条件)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.FindOne = function (tableName,selectStr,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        if(err){
            return callback(err);
        }
        db.collection(tableName).findOne(selectStr,function(err,result) {
            if (err) {
                return;
            }
            callback(result);
        });
        db.close();
    });
}

/**************************
 *
 * 功能：条件查询
 * 参数：tableName(查询的表名)、selectStr(查询条件)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.Find=function(tableName,selectStr,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        db.collection(tableName).find(selectStr).toArray(function(err,result) {
            if(err) {
                console.log(err);
                return;
            }
            callback(result);
        });
        db.close();
    });
}


/**************************
 *
 * 功能：查询所有数据，显示指定字段
 * 参数：tableName(查询的表名)、selectStr(查询条件)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.FindAll=function(tableName,selectStr,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        db.collection(tableName).find({},selectStr).toArray(function(err,result) {
            if(err) {
                console.log(err);
                return;
            }
            callback(result);
        });
        db.close();
    });
};


/**************************
 *
 * 功能：添加
 * 参数：tableName(查询的表名)、dataStr(添加的数据)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.Add=function(tableName,dataStr,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        db.collection(tableName).insert(dataStr,function(err) {
            if(err) {
                console.log(err);
                return false;
            } else {
                callback();
            }
        });
        db.close();
    });
};

/**************************
 *
 * 功能：删除
 * 参数：tableName(查询的表名)、delStr(删除条件)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.Delete=function(tableName,delStr,callback) {
    mongodb.MongoClient.connect(mongodb.DB_CONN_STR,function(err,db) {
        db.collection(tableName).remove(delStr,function(err) {
            if(err) {
                console.log(err);
                return false;
            } else {
                callback();
            }
        });
        db.close();
    });
};

/**************************
 *
 * 功能：修改
 * 参数：tableName(查询的表名)、whereStr(修改条件)、updateStr(修改数据)、callback(回调函数)
 *
 **************************/
MongoDBHelper.prototype.Update=function(tableName,whereStr,updateStr,callback) {
    MongoClient.connect(DB_CONN_STR,function(err,db) {
        db.collection(tableName).update(whereStr,updateStr,function(err) {
            if(err) {
                console.log(err);
                return false;
            } else {
                callback();
            }
        });
        db.close();
    });
};


module.exports = MongoDBHelper;