// var hello = require('./module');
// hello.world();


var Hello = require('./module');
var hello = new Hello();
hello.setName('zw');
hello.sayHello();
