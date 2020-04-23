$(document).ready(function() {
    var padID = $('#padID').text();
    $('#epad').pad({'padId': padID, 'userName': 'uname'});

    $.notify('// Welcome to: ' + padID, {
      	style: 'transparent',
      	className: 'success' 
    });

    $('#run').click(function() {
        $.notify('Not ready, yet', 'warning');
    });
});
