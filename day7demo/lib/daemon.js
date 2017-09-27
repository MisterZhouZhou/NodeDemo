// 守护进程
var cp = require('child_process');
var worker;
// 守护进程
function spawn(server){
   worker = cp.spawn('node', [server]);
   worker.on('exit', function(code){
    if(code !== 0){
       // 如果监听到退出就重启
       spawn(server);
    }
   })
}

function main(){
   spawn('server.js');
   process.on('SIGTERM',function(){
     worker.kill();
     process.exit(0);
   });
}

main();
