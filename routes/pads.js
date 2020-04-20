var express = require('express');
var router = express.Router();
var etherpad_api = require('../etherpad-api');

/* GET pads. */
router.get('/', function(req, res, next) {
	etherpad_api.listAllPads(function(error, data) {
		if(error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(data);
		}
	});
});

/* join a pad */
router.get('/join/:id', function(req, res) {
  res.render('pad', { title: 'Pad: ' + req.params.id, id: req.params.id });
});

/* create a pad */
router.get('/new/:id', function(req, res) {
	var args = {
		padID: req.params.id
	}
	etherpad_api.createPad(args, (error, data) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(data);
		}
	});
});

/* delete a pad */
router.get('/delete/:id', function(req, res) {
	var args = {
		padID: req.params.id
	}
  etherpad_api.deletePad(args, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});


module.exports = router;