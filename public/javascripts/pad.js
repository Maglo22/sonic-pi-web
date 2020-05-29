$(document).ready(() => {
    var socket = io();

    var padID = $('#padID').text();
    var username = $('#username').text();
    var usercolor = '#' + $('#usercolor').text();

    // join pad with especified username and usercolor
    $('#epad').pad({'padId': padID, 'userName': username, 'userColor': usercolor});

    socket.emit('notify', '// ' + username + ' joined the pad', 'transparent', 'success');

    $('#run').click(() => {
        socket.emit('notify', '// Running...', 'transparent', 'success');
        socket.emit('run pad', $('#padID').text());
        //socket.emit('client-stream-request', $('#padID').text());
    });

    $('#stop').click(() => {
        socket.emit('notify', '// Stopping...', 'transparent', 'success');
        socket.emit('stop pad', $('#padID').text());
    });

    socket.on('notify', (msg, style, classname) => {
        $.notify(msg, {
            style: style,
            className: classname
        });
    });

    /*ss(socket).on('chunk', function(chunk) {
        console.log(chunk);
    });*/

});
