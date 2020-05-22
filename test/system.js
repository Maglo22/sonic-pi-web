const chai = require('chai');
const path = require('path');
const fs = require('fs'); // file system
const { exec } = require('child_process'); // commands


const dir = path.join(__dirname, 'test-dir/');

describe('test system calls through node', () => {

  it('runs a terminal command', (done) => {
    exec('ls', (err, stdout, stderr) => {
      if (err) throw err;
			if (stderr) throw stderr;
			chai.assert.isOk(stdout);
      done();
    });
  });

  it('makes a directory', (done) => {
    fs.mkdir(dir, (err) => { 
			if (err) throw err;
      done();
    }); 
  });

  it('access a directory', (done) => {
    fs.access(dir, (err) => {
      if (err) throw err;
      done();
    });
  });

  it('deletes a directory', (done) => {
    fs.rmdir(dir, (err) => {
      if (err) throw err;
      done();
    }); 
  });

});
