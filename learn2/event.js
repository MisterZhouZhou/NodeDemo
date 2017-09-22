// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// var connectHandler = function connected(){
//   console.log('连接成功');
//   eventEmitter.emit('data_received');
// }

// eventEmitter.on('connection',connectHandler);
// eventEmitter.on('data_received',function(){
//   console.log('数据连接成功');
// });

// eventEmitter.emit('connection');
// console.log("程序执行完毕。");






// var eventEmitter = require('events').EventEmitter;
// var event = new eventEmitter();

// event.on('some_event',function(){
//   console.log('some_event 事件触发');
// });
// setTimeout(function(){
//    event.emit('some_event');
// },1000);




// var eventEmitter = require('events').EventEmitter;
// var event = new eventEmitter();
// event.on('someEvent', function(arg1,arg2){
//   console.log('listener1', arg1, arg2);
// });
// event.on('someEvent', function(arg1,arg2){
//   console.log('listener2', arg1, arg2);
// });
// event.emit('someEvent','arg1 参数', 'arg2 参数');







var eventEmitter = require('events').EventEmitter;
var event = new eventEmitter();
// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}
// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}
event.addListener('connection',listener1);
event.on('connection',listener2);

var eventListeners = require('events').EventEmitter.listenerCount(event,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");
// 处理 connection 事件
event.emit('connection');
event.removeListener('connection',listener1);
console.log("listener1 不再受监听。");
// 触发连接事件
event.emit('connection');
eventListeners = require('events').EventEmitter.listenerCount(event,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");
console.log("程序执行完毕。");
