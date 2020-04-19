var api = require('etherpad-lite-client');

// EtherPad
var etherpad = api.connect({
    apikey: 'bf49084cb557392feb24e5c86535e43c7f72078b369400620e65e056198b0b4c',
    host: 'localhost',
    port: 9001,
});

module.exports = etherpad;