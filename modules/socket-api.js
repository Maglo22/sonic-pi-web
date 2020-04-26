var socket_io = require('socket.io');
var etherpad_api = require('../modules/etherpad-api');
var io = socket_io();
var socket_api = {};
var fs = require('fs'); // file system

const { exec } = require("child_process");

var path = '/home/br1/test-files/'; // TODO: make it relative

io.on('connection', (socket) => {
  // play content on pad
  socket.on('run pad', (padID) => {
    var args = {
      padID: padID
    }
    etherpad_api.getText(args, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        let fileName = padID + '.rb';
        let pathToFile = path + fileName;
        
        saveToFileAndRun(pathToFile, data.text);
      }
    });
  });

  // stop playing pad
  socket.on('stop pad', (padID) => {
    runCommand('sonic-pi-tool stop');
  });

});

// save text of the pad to file for sonic-pi-tool to run
function saveToFileAndRun(pathToFile, text) {
  fs.open(pathToFile, 'w', (err, fd) => {
    if (err) throw err;
    fs.write(fd, text, (err, written, string) => {
      if (err) throw err;
      console.log('written ' + written + ' bytes to ' + pathToFile);

      runCommand('sonic-pi-tool eval-file ' + pathToFile); // run the file with sonic-pi-tool
  
      // close file descriptor
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });
  });
}

function runCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log('command executed: ' + command);
  });
}


socket_api.io = io;

module.exports = socket_api;