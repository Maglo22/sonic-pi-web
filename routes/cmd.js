var express = require('express');
var router = express.Router();

const { exec } = require("child_process");


/* GET home page. */
router.get('/', function(req, res, next) {
  exec("sonic-pi-tool --version", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        res.render('error', {error: error});
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        res.render('cmd', { title: 'Sonic-Pi-Web', stdout: stderr });
        return;
    }
    res.render('cmd', { title: 'Sonic-Pi-Web', stdout: stdout });
  });
});



module.exports = router;
