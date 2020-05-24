/*
  Tests etherpad api calls through socket.io.
  Don't forget to change the exported var in ehterpad-api.js if you have another
  etherpad instance for testing, and that this one is running.
*/
const chai = require('chai');
const io = require('socket.io');
const io_client = require('socket.io-client');
// etherpad-lite
const etherpad_api = require('../modules/etherpad-api');

// configure socket
const socketURL = 'http://0.0.0.0:5000';
const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('test etherpad API calls through socket.io', () => {
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

  it('lists all pads through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('list', () => {
        etherpad_api.listAllPads((err, data) => {
          if (err) throw err;
          socket.emit('success', data);
        });
      });
    });

    client.on('connect', () => {
      client.emit('list');
    });

    client.on('success', (data) => {
      chai.assert.isNotNull(data);
      done();
    });
  });

  it('creates pad through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('create', (padID) => {
        let args = {
          padID: padID
        }
        etherpad_api.createPad(args, (err, data) => {
          if (err) throw err;
          socket.emit('success', data);
        });
      });
    });

    client.on('connect', () => {
      client.emit('create', 'io-pad');
    });

    client.on('success', (data) => {
      chai.assert.equal(data.code, 0); // success call -> { code: 0, message:"ok", data: null }
      done();
    });
  });

  it('gets pad text through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('get-text', (padID) => {
        let args = {
          padID: padID
        }
        etherpad_api.getText(args, (err, data) => {
          if (err) throw err;
          socket.emit('success', data);
        });
      });
    });

    client.on('connect', () => {
      client.emit('get-text', 'io-pad');
    });

    client.on('success', (data) => {
      chai.assert.isString(data.text); // success call -> { text: 'some text' }
      done();
    });
  });

  it('deletes pad through socket.io call', (done) => {
    server.on('connection', (socket) => {
      socket.on('delete', (padID) => {
        let args = {
          padID: padID
        }
        etherpad_api.deletePad(args, (err, data) => {
          if (err) throw err;
          socket.emit('success', data);
        });
      });
    });

    client.on('connect', () => {
      client.emit('delete', 'io-pad');
    });

    client.on('success', (data) => {
      chai.assert.equal(data.code, 0); // success call -> { code: 0, message:"ok", data: null }
      done();
    });
  });
});