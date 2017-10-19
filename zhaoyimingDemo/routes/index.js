var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'baselayout'});
});

router.get('/mobile', function(req, res, next) {
  res.render('mobile', { title: 'mobile', layout: 'baselayout'});
});

router.get('/video', function(req, res, next) {
  res.render('video', { title: 'video', layout: 'baselayout'});
});

module.exports = router;
