var http = require('http'),
    assert = require('assert');

var opts = {
      host: 'localhost',
      port: 8000,
      path: '/send',
      method: 'POST',
      headers: {'content-type':'application/x-www-form-urlencoded'}
}

var req = http.request(opts, (res)=>{
   res.setEncoding('utf8')
    var data = ""
    res.on('data', (d) => {
      data += d
    })
    res.on('end', ()=> {
        console.log(data);
        // 断言，不满足条件就会抛出异常
        assert.strictEqual(data, '{"status":"ok","message":"Tweet eceived"}')
    })
});

req.write('tweet=test');
req.end();
