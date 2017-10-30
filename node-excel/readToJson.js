 // node_xj = require("xls-to-json");
 //  node_xj({
 //    input: "streamed-workbook.xlsxample.xlsx",  // input xls
 //    output: "output.json", // output json
 //    sheet: "Sheet"  // specific sheetname
 //  }, function(err, result) {
 //    if(err) {
 //      console.error(err);
 //    } else {
 //      console.log(result);
 //    }
 //  });


var Excel = require('exceljs');
var workbook = new Excel.stream.xlsx.WorkbookWriter({
  filename: './streamed-workbook.xlsx'
});
// var worksheet = workbook.getWorksheet('Sheet');
console.log(workbook);
// workbook.worksheets.forEach(function(worksheet, sheetId) {
//     console.log(worksheet);
// });

// // 添加sheet
// var worksheetWriter = workbook.addSheet('sheet', {properties:{outlineLevelCol:1}});
// worksheetWriter.properties.outlineLevelCol = 2;
// worksheetWriter.properties.defaultRowHeight = 15;

// workbook.commit();



// console.log('=====');
// var xlsx = require("node-xlsx");
// // var list = xlsx.parse('streamedworkbook.xlsx');
// const workSheetsFromFile = xlsx.parse(`${__dirname}/streamedworkbook.xlsx`);
// console.log(workSheetsFromFile);

// var fs = require('fs');
// fs.open('input.txt','r', function(err, fd){
//   console.log('c');
// });
