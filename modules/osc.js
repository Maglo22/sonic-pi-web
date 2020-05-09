var osc = require('osc');

var udpPort = new osc.UDPPort({
  // This is the port we're listening on.
  localAddress: "127.0.0.1",
  localPort: 4657,

  // This is where scsynth is listening for OSC messages.
  remoteAddress: "127.0.0.1",
  remotePort: 4557,
  metadata: true
});


// Open the socket.
udpPort.open();

udpPort.on('osc', function (packet, info) {
    console.log(packet);
});

udpPort.on('error', function (error) {
  console.log(error);
});

module.exports = udpPort;