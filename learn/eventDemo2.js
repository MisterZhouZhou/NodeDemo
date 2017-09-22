/**
 * Created by chengfei on 17/6/23.
 */

var EventEmitter = require("events").EventEmitter;
var event = new EventEmitter();

event.on("some_event",function () {
    console.log('some_event 事件触发');
});

setTimeout(function () {
    event.emit("some_event");
},1000)