var api = require('etherpad-lite-client');

// EtherPad
var etherpad = api.connect({
    apikey: 'your-api-key',
    host: 'localhost',
    port: 9001,
});

module.exports = etherpad;