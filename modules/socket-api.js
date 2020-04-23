var socket_io = require('socket.io');
var io = socket_io();
var socket_api = {};

io.on('connection', (socket) => {
  console.log('a user connected');
});


socket_api.io = io;

module.exports = socket_api;