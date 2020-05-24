/*
  Tests for system calls through node server.
  The file system and child processes functions used in the app
  are the ones being tested here.
*/
const chai = require('chai');
const path = require('path');
const fs = require('fs'); // file system
const { exec } = require('child_process'); // commands


const dir = path.join(__dirname, 'test-dir/');
const pathToFile = dir + 'test.rb';

describe('test system calls through node', () => {

  it('runs terminal command (ls)', (done) => {
    exec('ls', (err, stdout, stderr) => {
      if (err) throw err;
			if (stderr) throw stderr;
			chai.assert.isOk(stdout);
      done();
    });
  });

  it('makes directory', (done) => {
    fs.mkdir(dir, (err) => { 
			if (err) throw err;
      done();
    }); 
  });

  it('access directory', (done) => {
    fs.access(dir, (err) => {
      if (err) throw err;
      done();
    });
  });

  it('opens file and writes to it', (done) => {
    fs.open(pathToFile, 'w', (err, fd) => {
      if (err) throw err;
      let text = 'abcdefghijklmnopqrstuvwxyz';

      fs.write(fd, text, (err, written) => {
        if (err) throw err;
        chai.assert.isNotNaN(written);
        // close file descriptor
        fs.close(fd, (err) => {
          if (err) throw err;
          done();
        });
      });
    });
  });

  it('removes file', (done) => {
    fs.unlink(pathToFile, (err) => {
      if (err) throw err;
      done();
    });
  });

  it('deletes directory', (done) => {
    fs.rmdir(dir, (err) => {
      if (err) throw err;
      done();
    }); 
  });

});
