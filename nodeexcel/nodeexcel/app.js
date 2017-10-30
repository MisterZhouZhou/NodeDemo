/**
 *
 * Coolspan
 */
var fs = require('fs');
var xlsx = require('node-xlsx');

var ajax = require('./ajax.js');
start();
function start() {
    ajax.ajax({
        url: "http://yuntuapi.amap.com/datamanage/data/list",
        type: "GET",
        data: {
            tableid: "53eacbe4e4b0693fbf5fd13b",//53eacbe4e4b0693fbf5fd13b
            key: "XXX"
        },
        success: function (data) {
            var myDatas = [];
            var datas = (JSON.parse(data)).datas;
            var count = 0;
            for (var index in datas) {
                var account = datas[index];
                var colum = [];
                var names;
                if (index == 0) {
                    names = [];
                }
                for (var index2 in account) {
                    if (index == 0)
                        names.push(index2);
                    var value = account[index2];
                    if (value == null) {
                        value = "";
                    }
                    colum.push(value);
//                    console.log(account);
                }
                if (index == 0) {
                    myDatas.push(names);
                }
                myDatas.push(colum);

                if (index == datas.length - 1) {
                    // writeXls(myDatas);
                    parseXls(myDatas);
                }
            }
            console.log(myDatas.length);
        }
    });
}
function writeXls(datas) {
    var buffer = xlsx.build({worksheets: [
        {"name": "Group", "data": datas}
    ]});
    fs.writeFileSync("Group.csv", buffer, 'binary');
}
function parseXls() {
    var obj = xlsx.parse('myFile.xlsx');
    console.log(obj);
}
