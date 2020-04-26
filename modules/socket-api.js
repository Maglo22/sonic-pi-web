var socket_io = require('socket.io');
var etherpad_api = require('../modules/etherpad-api');
var io = socket_io();
var socket_api = {};
var fs = require('fs'); // file system

const { exec } = require("child_process");

io.on('connection', (socket) => {
  //console.log('a user connected');
  socket.on('run pad', (padID) => {
    var args = {
      padID: padID
    }
    etherpad_api.getText(args, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        fs.writeFile('/home/br1/test-files/test.txt', data.text, function (err) { // TODO: change to relative path
          if (err) return console.log(err);
          console.log('text > test.txt');
        });
      }
    });
  });

});

function cmd(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`success/nstdout: ${stdout}`);
  });
}


socket_api.io = io;

module.exports = socket_api;