$(document).ready(function() {
    var padID = $('#padID').text();
    $('#epad').pad({'padId': padID, 'userName': 'uname'});

    $('#run').click(function() {
        $.notify('Not ready, yet', 'warning');
    });
});
