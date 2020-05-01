$(document).ready(function() {
    var socket = io();

    var padID = $('#padID').text();
    var username = $('#username').text();
    var usercolor = '#' + $('#usercolor').text();

    // join pad with especified username and usercolor
    $('#epad').pad({'padId': padID, 'userName': username, 'userColor': usercolor});

    socket.emit('notify', '// ' + username + ' joined the pad', 'transparent', 'success');

    $('#run').click(function() {
        socket.emit('notify', '// Running...', 'transparent', 'success');
        socket.emit('run pad', $('#padID').text());
    });

    $('#stop').click(function() {
        socket.emit('notify', '// Stopping...', 'transparent', 'success');
        socket.emit('stop pad', $('#padID').text());
    });

    socket.on('notify', function(msg, style, classname){
        $.notify(msg, {
            style: style,
            className: classname
        });
    });

});
