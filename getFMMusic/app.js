const http = require('http')
const request = require('request')
const async = require('async')
const util = require('util')
const fs = require('fs')

function QingTingFM(chan, id) {
    this._chan = chan
    this._id = id
}

QingTingFM.prototype = {
  crawl: function (resq) {
    var url = this.getAjaxUrl();
     request(url, function (err, res, body) {
        if (res.statusCode == 200 && err == null) {
          //将字符串转换为json对象
          var data = JSON.parse(body);
          resq.end(JSON.stringify(data));
        }else{
          resq.end('Bye');
        }
     });
  },
  getAjaxUrl: function () {
      return util.format('http://www.qingting.fm/s/vchannels/%s/programs/%s/ajax', this._chan, this._id)
  }
}


// var t1 = new Date().getTime()

http.createServer((req,res)=>{
  qtfm = new QingTingFM(136962, 5745196)
  qtfm.crawl(res)
}).listen(8000);
console.log('127.0.0.1:8000');


