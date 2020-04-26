$(document).ready(function() {
    var socket = io();

    var padID = $('#padID').text();
    $('#epad').pad({'padId': padID, 'userName': 'uname'});

    $.notify('// Welcome to: ' + padID, {
      	style: 'transparent',
      	className: 'success' 
    });

    $('#run').click(function() {
        $.notify('// Running...', {
            style: 'transparent',
            className: 'success' 
        });
        socket.emit('run pad', $('#padID').text());
    });

    $('#stop').click(function() {
        $.notify('// Stopping...', {
            style: 'transparent',
            className: 'success' 
        });
    });
});
