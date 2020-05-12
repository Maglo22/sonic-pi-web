var socket_io = require('socket.io');
var io = socket_io();
var socket_api = {};

var etherpad_api = require('../modules/etherpad-api');
var path = require('path');
var fs = require('fs'); // file system

const { exec } = require('child_process');

var dir = path.join(__dirname, '..', 'pad_files/');


io.on('connection', (socket) => {
  // play content on pad
  socket.on('run pad', (padID) => {
    var args = { padID: padID }

    etherpad_api.getText(args, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        let fileName = padID + '.rb';
        let pathToFile = dir + fileName;
        
        dirCheck(padID, pathToFile, data.text); // check if the directory for pad files exist before playing the file
      }
    });
  });

  // stop playing pad
  socket.on('stop pad', (padID) => {
    console.log('stopping pad: // ' + padID);
    runCommand('sonic-pi-tool stop');
  });

  // notification for users in pad
  socket.on('notify', (msg, style, classname) => { io.emit('notify', msg, style, classname); });

});

// check if directory for saving files is found
function dirCheck(padID, pathToFile, text) {
  fs.access(dir, (err) => {
    if (err) {
      // dir not found
      if (err.code === 'ENOENT') {
        fs.mkdir(dir, (err) => { 
          if (err) throw err;

          console.log('pad_files dir not found, creating it');
          console.log('playing pad: // ' + padID);
          saveFileAndRun(pathToFile, text); // save file and play it with sonic-pi-tool
        }); 
      } else { throw err; }
    }
    // dir found
    console.log('playing pad: // ' + padID);
    saveFileAndRun(pathToFile, text); // save file and play it with sonic-pi-tool
  });
}

// save text of the pad to file for sonic-pi-tool to run
function saveFileAndRun(pathToFile, text) {
  fs.open(pathToFile, 'w', (err, fd) => {
    if (err) throw err;
    fs.write(fd, text, (err, written) => {
      if (err) throw err;

      console.log('written ' + written + ' bytes to ' + pathToFile);
      runCommand('sonic-pi-tool eval-file ' + pathToFile); // run the file with sonic-pi-tool
  
      // close file descriptor
      fs.close(fd, (err) => { if (err) throw err; });
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