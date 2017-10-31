// var Excel = require('exceljs');

// var workbook = new Excel.Workbook();
// var data = [];
// workbook.xlsx.readFile('./streamed-workbook.xlsx')
//     .then(function(){
//     var worksheet = workbook.getWorksheet(1);
//     var row = worksheet.getRow(2);
//     row.eachCell(function(cell, colNumber){
//         var value = cell.value;
//         if(typeof value == "object") value = value.text;
//         data.push(value);
//         //console.log('Cell ' + colNumber + ' = ' + JSON.stringify(cell.value.text));
//     });
//     //console.log(worksheet.getRow(2));
//     console.log(JSON.stringify(data));
// });


var express = require('express');
var router = express.Router();
var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();

/* GET import excel test. */
router.get('/importExcel', function(req, res, next) {
   let dataArray = [];
   workbook.xlsx.readFile('./test.xlsx')
      .then(function(){
      var worksheet = workbook.getWorksheet(1);
      let dataArray = changeRowsToDict(worksheet);
      console.log(JSON.stringify(dataArray));
      res.send(dataArray);
  });
});

/* 将所有的行数据转换为json */
function changeRowsToDict(worksheet){
  let dataArray = [];
  let keys = [];
  worksheet.eachRow(function(row, rowNumber) {
    if(rowNumber == 1){
      keys = row.values;
    }
    else{
      // method1  ===============
      // let rowDict = cellValueToDict(keys, row.values);
      // dataArray.push(rowDict);
      // method2  ===============
      let rowDict = cellValueToDict2(keys, row);
      dataArray.push(rowDict);
    }
  });
  return dataArray;
}

/* keys: {id,name,phone}, rowValue：每一行的值数组, 执行次数3次 */
function cellValueToDict(keys,rowValue){
  let rowDict = {};
  keys.forEach((value,index)=>{
    rowDict[value] = rowValue[index];
  });
  return rowDict;
}

/* keys: {id,name,phone}, rowValue：每一行的值数组， 执行次数3次 */
function cellValueToDict2(keys,row){
  let data = {};
  row.eachCell(function(cell, colNumber){
    var value = cell.value;
    if(typeof value == "object") value = value.text;
    data[keys[colNumber]]  = value;
  });
  return data;
}


// /* GET export excel test. */
// router.get('/exportExcel', function(req, res, next) {
// // write
// var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "mySheetName", data: data}]);
// fs.writeFileSync('b.xlsx', buffer, 'binary');
// res.send('export successfully!');

// });

var app = express();

app.use('/',router);
app.listen(8088);
