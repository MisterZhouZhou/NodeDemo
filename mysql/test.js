var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zw123456',
  port: '3306',
  database: 'test'
});

connection.connect();
// 查询sql
// -------------------------------------------------------------------
// var sql = 'SELECT * FROM website';
// connection.query(sql,function(err,result){
//   if (err) {
//     console.log('[SELECT ERROR] - ',err.message);
//     return;
//   }
//   console.log('--------------------------SELECT----------------------------');
//   console.log(result);
//   console.log('------------------------------------------------------------\n\n');
// })
// -------------------------------------------------------------------


// 插入sql
// -------------------------------------------------------------------
// var addsql = 'INSERT INTO website(id,name,aiexa,country,url) VALUES(0,?,?,?,?)';
// var addSqlParams = ['菜鸟工具','15', 'CN', 'https://c.runoob.com'];
// connection.query(addsql,addSqlParams,function(err,result){
//   if(err){
//     console.log('[INSERT ERROR] - ',err.message);
//     return;
//   }
//     console.log('--------------------------INSERT----------------------------');
//     console.log('INSERT ID:',result);
//     console.log('-----------------------------------------------------------------\n\n');
// });


// 更新sql
// -------------------------------------------------------------------
// var modSql = 'UPDATE website SET name=?,url=?where id=?';
// var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
// connection.query(modSql,modSqlParams,function(err,result){
//   if(err){
//     console.log('[UPDATE ERROR] - ',err.message);
//     return;
//   }
//    console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });



// 删除sql
var delSql = 'DELETE FROM website where id=6';
connection.query(delSql,function(err,result){
  if (err) {
    console.log('[DELETE ERROR] - ',err.message);
    return;
  }
  console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');
});




















