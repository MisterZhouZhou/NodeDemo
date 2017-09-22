//  模拟聊天服务器接收到数据（类似于群聊）
//  V 0.0.1(客户端退出会导致报错)
// var net = require('net');
// var chatServer = net.createServer().listen(9000);
// var clientList = [];

// chatServer.on('connection',(client)=>{
//   client.name = client.remoteAddress + ':' + client.remotePort;
//   client.write('Hi ' + client.name + '!\n');
//   clientList.push(client);
//   client.on('data',(data)=>{
//     broadcast(data, client);
//   });
// });

// function broadcast(message, client) {
//   for(var i=0;i<clientList.length;i+=1) {
//     if(client !== clientList[i]) {
//       clientList[i].write(client.name + " says " + message)
//   } }
// }

// console.log('服务器运行于：127.0.0.1:9000');




//  V 0.0.2  稳固客户端退出报错问题
var net = require('net');
var chatServer = net.createServer().listen(9000);
var clientList = [];

chatServer.on('connection',(client)=>{
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('Hi ' + client.name + '!\n');
  // 记录用户登入
  console.log(client.name + ' joined')
  clientList.push(client);
  // 监听客户端发送的数据
  client.on('data',(data)=>{
    broadcast(data, client);
  });
  // 监听客户端退出聊天
  client.on('end',()=>{
    // 记录用户登出
    console.log(client.name + ' quit')
    // 删除当前用户
    clientList.splice(clientList.indexOf(client), 1);
  });

});

function broadcast(message, client) {
  var cleanup = [];
  for(var i=0;i<clientList.length;i+=1) {
    if(client !== clientList[i]) {
       if(clientList[i].writable) {
          clientList[i].write(client.name + " says " + message)
        } else {
          // 剔除死节点
          cleanup.push(clientList[i]);
          // 关闭节点连接， 遍历 clientList 的过程中并没有移除 socket
          clientList[i].destroy();
        }
    }
  }
  // 在写入循环中删除死节点，消除垃圾索引
   for(i=0;i<cleanup.length;i+=1) {
      clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

console.log('服务器运行于：127.0.0.1:9000');
