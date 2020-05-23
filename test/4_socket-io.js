/*
Tests for Socket.io.
*/
const chai = require('chai');
const io = require('socket.io');
const io_client = require('socket.io-client');

// configure socket
const socketURL = 'http://0.0.0.0:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('test socket.io', () => {
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

  it('connects socket.io server and client.', (done) => {
    client.on('connect', () => {
      done();
    });
  });

  it('emits message from server to client', (done) => {
    server.on('connection', (socket) => {
      socket.emit('notify', 'notification');
    });

    client.on('notify', (data) => {
      chai.assert.equal(data, 'notification');
      done();
    });
  });

  it('emits message from client to server', (done) => {
    client.on('connect', () => {
      client.emit('notify', 'notification');
    });

    server.on('connection', (socket) => {
      socket.on('notify', (data) => {
        chai.assert.equal(data, 'notification');
        done();
      });
    });
  });

});