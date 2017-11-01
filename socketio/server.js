var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];


app.use('/', express.static(__dirname+'/'));
server.listen(8088);

io.sockets.on('connection',(socket)=>{
  // 失去连接
  socket.on('disconnect',function(){
    if(users.indexOf(socket.username)>-1){
       users.splice(users.indexOf(socket.username),1);
       console.log(socket.username+'===>disconnected');
    }

      socket.broadcast.emit('users',{number:users.length});
  });

  socket.on('message',function(data){
    let newData = {text: data.text, user: socket.username}
    socket.emit('receive_message',newData);
    socket.broadcast.emit('receive_message',newData);
  });


  socket.on('login',function(data){
    if(users.indexOf(data.username)>-1){

    }else{
      socket.username = data.username;
      users.push(data.username);
      // 统计连接数
      socket.emit('users',{number:users.length});  // 发送给自己
      socket.broadcast.emit('users',{number:users.length}); // 发送给其他人
    }

  });

});


console.log('服务器运行于：localhost:8088');
