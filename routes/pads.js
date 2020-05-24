/*
	Routes for etherpad-lite calls (listing pads, requesting text from a pad, etc.).
*/
var express = require('express');
var router = express.Router();
var etherpad_api = require('../modules/etherpad-api');

/* GET pads. */
router.get('/', function(req, res) {
	etherpad_api.listAllPads((err, data) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});


/* join a pad */
router.get('/:id.:username.:usercolor', (req, res) => {
  res.render('pad', {
			title: '// ' + req.params.id,
			id: req.params.id,
			username: req.params.username,
			usercolor: req.params.usercolor
		});
});

/* create a pad */
router.get('/new/:id', (req, res) => {
	let args = {
		padID: req.params.id
	}
	etherpad_api.createPad(args, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

/* delete a pad */
router.get('/delete/:id', (req, res) => {
	let args = {
		padID: req.params.id
	}
  etherpad_api.deletePad(args, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


module.exports = router;