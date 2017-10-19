#!/usr/bin/env node

// var p = require('procstreams');
// p('cat app.js').pipe('wc -l').data((stdout,stderr)=>{
//   console.log(stdout);
// });


var process = require('child_process');
process.exec('cat app.log | wc -l', (error,stdout,stderr)=>{
  if(error){
    console.log('exec error:' + error);
  }else{
     // 输出内容
     console.log(stdout);
  }
});
