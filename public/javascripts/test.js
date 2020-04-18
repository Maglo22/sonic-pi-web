$( document ).ready(function() {
    $('#epad').pad({'padId':'test'});

    $('#run').click(function() {
        // getText('test', [rev]);
        Swal.fire({
            toast: 'true',
            position: 'top',
            text: 'Not ready... yet',
            icon: 'warning',
            timer: 3000,
            showConfirmButton: false
        });
    });
});
