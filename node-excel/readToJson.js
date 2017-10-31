var Excel = require('exceljs');

var workbook = new Excel.Workbook();
var data = [];
workbook.xlsx.readFile('./streamed-workbook.xlsx')
    .then(function(){
    var worksheet = workbook.getWorksheet(1);
    var row = worksheet.getRow(2);
    row.eachCell(function(cell, colNumber){
        var value = cell.value;
        if(typeof value == "object") value = value.text;
        data.push(value);
        //console.log('Cell ' + colNumber + ' = ' + JSON.stringify(cell.value.text));
    });
    //console.log(worksheet.getRow(2));
    console.log(JSON.stringify(data));
});
