/*
  Tests system calls through Socket.io.
*/
const chai = require('chai');
const io = require('socket.io');
const io_client = require('socket.io-client');
// system
const path = require('path');
const fs = require('fs'); // file system
const { exec } = require('child_process'); // commands

const dir = path.join(__dirname, 'io-test-dir/');

// configure socket
const socketURL = 'http://0.0.0.0:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('test system calls through socket.io', () => {
  let server;
  let client;

  beforeEach(() => {
    server = io().listen(5000);
    client = io_client.connect(socketURL, options);
  });

  afterEach(() => {
    server.close();
    client.close();
  });

  it('makes directory through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('mkdir', (dir) => {
        fs.mkdir(dir, (err) => { 
          if (err) throw err;
          socket.emit('success', 'dir created');
        }); 
      });
    });

    client.on('connect', () => {
      client.emit('mkdir', dir);
    });

    client.on('success', (data) => {
      chai.assert.equal(data, 'dir created');
      done();
    });
  });

  it('deletes directory through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('rmdir', (dir) => {
        fs.rmdir(dir, (err) => { 
          if (err) throw err;
          socket.emit('success', 'dir deleted');
        }); 
      });
    });

    client.on('connect', () => {
      client.emit('rmdir', dir);
    });

    client.on('success', (data) => {
      chai.assert.equal(data, 'dir deleted');
      done();
    });
  });

  it('runs terminal command through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('command', (cmd) => {
        exec(cmd, (err, stdout, stderr) => {
          if (err) throw err;
          if (stderr) throw stderr;
          chai.assert.isOk(stdout);
          socket.emit('success', 'command executed');
        });
      });
    });

    client.on('connect', () => {
      client.emit('command', 'ls');
    });

    client.on('success', (data) => {
      chai.assert.equal(data, 'command executed');
      done();
    });
  });

  it('runs sonic-pi-tool command through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('command', (cmd) => {
        exec(cmd, (err, stdout, stderr) => {
          if (err) throw err;
          if (stderr) throw stderr;
          chai.assert.isOk(stdout);
          socket.emit('success', 'command executed');
        });
      });
    });

    client.on('connect', () => {
      client.emit('command', 'sonic-pi-tool -V');
    });

    client.on('success', (data) => {
      chai.assert.equal(data, 'command executed');
      done();
    });
  });

});