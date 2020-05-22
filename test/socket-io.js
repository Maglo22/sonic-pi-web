const chai = require('chai');
const io = require('socket.io');
const io_client = require('socket.io-client');

// configure chai
chai.should();

// configure socket
const socketURL = 'http://0.0.0.0:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Socket-Server', () => {
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


  it('allows connection between socket server and client.', (done) => {
    client.on('connect', (data) => {
      done();
    });
  });
});