// spcket.io
const socket_io = require('socket.io');
const io = socket_io();
var socket_api = {};
// etherpad-lite
const etherpad_api = require('../modules/etherpad-api');
// system
const system = require('./system');
const path = require('path');
// streams
const { Readable } = require('stream'); // node streams
const { RtAudio, RtAudioFormat } = require('audify'); // audify streams
const ss = require('socket.io-stream'); // socket.io-stream

// directory for pad files storage
const dir = path.join(__dirname, '..', 'pad_files/');

const rtAudio = new RtAudio();
const inStream = new Readable({
  read() {}
});

io.on('connection', (socket) => {
  // play content on pad
  socket.on('run pad', (padID) => {
    let args = { padID: padID }

    etherpad_api.getText(args, (error, data) => {
      if (error) {
        io.emit('notify', 'error getting text from pad', 'transparent', 'error');
        console.error(error);
      } else {
        let fileName = padID + '.rb';
        let pathToFile = dir + fileName;
        
        system.dirCheck(padID, pathToFile, data.text); // check if the directory for pad files exist before playing the file
      }
    });
  });

  // stop playing pad
  socket.on('stop pad', (padID) => {
    console.log('stopping pad: // ' + padID);
    system.runCommand('sonic-pi-tool stop');
    
    if (rtAudio.isStreamOpen()) {
      if (rtAudio.isStreamRunning()) {
        rtAudio.stop();
      }
      inStream.pause(); // tell the readable stream there is nothing more to read
      rtAudio.closeStream();
    }
  });

  // notification for users in pad
  socket.on('notify', (msg, style, classname) => { io.emit('notify', msg, style, classname); });

  // audio stream
  socket.on('client-stream-request', (padID) => {
    console.log('streaming audio from: // ' + padID);

    var stream = ss.createStream(); // duplex stream
    
    // audify stream (capture audio from input device)
    if (!rtAudio.isStreamOpen()) {
      rtAudio.openStream(
        null, // no output device
        {
          deviceId: rtAudio.getDefaultInputDevice(),
          nChannels: 1,
          firstChannel: 0
        },
        RtAudioFormat.RTAUDIO_FLOAT32,
        44100,
        1024,
        'Sonic-Pi',
        pcm => inStream.push(pcm) // push pcm data from input device to readable stream
      );
    }

    if (!rtAudio.isStreamRunning()) {
      rtAudio.start();
    }

    ss(socket).emit('audio-stream', stream);

    if (inStream.isPaused()) {
      inStream.resume();
    }

    inStream.pipe(stream); // pipe readable stream to duplex stream
  });

});


socket_api.io = io;

module.exports = socket_api;