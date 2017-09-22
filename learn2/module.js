// exports.world = function(){
//   console.log('Hello World!');
// }



function Hello() {
  // body...
  var name;
  this.setName = function(argument) {
    name = argument;
  };
  this.sayHello = function(){
    console.log('Hello'+name);
  };
}

module.exports = Hello;
