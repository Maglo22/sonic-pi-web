var express = require('express');
var router = express.Router();
var etherpad_api = require('../etherpad-api');

/* GET home page. */
router.get('/', function(req, res, next) {
  etherpad_api.listAllPads(function(error, data) {
    if(error) {
      res.render('error', {error: error});
    } else {
      res.render('index', { title: 'Sonic-Pi-Web', pads: data });
    }
  });
});

/* join a pad */
router.get('/pad/:id', function(req, res) {
  res.render('pad', { title: 'Pad: ' + req.params.id, id: req.params.id });
});

/* create a pad */
router.post('/pad/new/:id', function(req, res) {
  etherpad_api.createPad(req.params.id, (error, data) => {
    if (error) {
      res.render('error', {error: error});
    } else {
      res.redirect('/');
    }
  });
});

/* delete a pad */
router.get('/pad/delete/:id', function(req, res) {
  etherpad_api.deletePad(req.params.id, (error, data) => {
    if (error) {
      res.render('error', {error: error});
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
