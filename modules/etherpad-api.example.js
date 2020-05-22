var api = require('etherpad-lite-client');

// Etherpad
var etherpad = api.connect({
    apikey: 'your-api-key',
    host: 'localhost',
    port: 9001,
});

// Etherpad instance for testing
var etherpadT = api.connect({
    apikey: 'another-api-key',
    host: 'localhost',
    port: 9002,
});

module.exports = etherpad;