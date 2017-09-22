// 引入 events 模块
var eventsEmitter = require('events').EventEmitter;
// 创建 eventEmitter 对象
var eventEmitter = new eventsEmitter();

var eventHandler = function connected(){
  console.log('连接成功');
  // 触发事件
  eventEmitter.emit('data_received');

}

// 绑定事件及事件的处理程序
eventEmitter.on('eventName',eventHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发事件
eventEmitter.emit('eventName');
console.log("程序执行完毕。");
