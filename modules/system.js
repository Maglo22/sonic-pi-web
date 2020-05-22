// system
const path = require('path');
const fs = require('fs'); // file system
const { exec } = require('child_process'); // commands

// directory for pad files storage
const dir = path.join(__dirname, '..', 'pad_files/');

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

// run a terminal command
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

exports.dirCheck = dirCheck;
exports.saveFileAndRun = saveFileAndRun;
exports.runCommand = runCommand;