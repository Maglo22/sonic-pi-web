var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('error', {error: error});
  res.render('index', { title: 'Sonic-Pi-Web' });
});


module.exports = router;
