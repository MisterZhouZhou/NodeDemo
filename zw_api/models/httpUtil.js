var request = require('request');
var urllib  = require('url');

  function get(url,req,res){
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(JSON.stringify({result:JSON.parse(body),status: 200}));
        }
    });
  }

  function post(url,requestData,req,res){
    console.log(JSON.stringify(requestData));
    // 暂时不行
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('333');
          console.log(body);
          res.end(JSON.stringify({result:'11122',status: 200}));
        }
        console.log('222');
    });
  }

module.exports = {
  get,
  post
};
