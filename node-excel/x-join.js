var node_xj = require("xls-to-json");
node_xj({
  input: "./test.xlsx",  // input xls
  output: "xx.json", // output json
  sheet: "工作表1"  // specific sheetname
}, function(err, result) {
  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
