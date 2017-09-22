var express = require('express');
var bodyParser = require('body-parser');

// createServer方法可能被废弃，使用以下方法代替
// var app = express.createServer();
var app = express();
app.listen(8000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var tweets = [];

app.get('/',(req,res)=>{
  res.send('Welcome to Node Twitter');
});

// app.post('/send',express.bodyParser(),(req,res)=>{
//   if(req.body && req.body.tweet){
//     tweets.push(req.body.tweet);
//     res.send({"status":"ok","message":"Tweet received"});
//   }else{
//     // 没有 tweet ?
//     res.send({status:"nok", message:"No tweet received"})
//   }
// });

app.post('/send',(req,res)=>{
  if(req.body && req.body.tweet){
    tweets.push(req.body.tweet);
    res.send({"status":"ok","message":"Tweet received"});
  }else{
    // 没有 tweet ?
    res.send({status:"nok", message:"No tweet received"})
  }
});


app.get('/tweets', (req,res)=>{
  res.send(tweets)
})
