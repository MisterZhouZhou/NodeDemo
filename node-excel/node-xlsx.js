var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var fs = require('fs');

/* GET import excel test. */
router.get('/importExcel', function(req, res, next) {
 var filename='./test.xlsx';
 console.error(filename);
 // read from a file
var obj = xlsx.parse(filename);
console.log(JSON.stringify(obj));

res.send('import successfully!');
});

/* GET export excel test. */
router.get('/exportExcel', function(req, res, next) {
// write
var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]);
fs.writeFileSync('b.xlsx', buffer, 'binary');
res.send('export successfully!');

});

var app = express();

app.use('/',router);
app.listen(8088);
