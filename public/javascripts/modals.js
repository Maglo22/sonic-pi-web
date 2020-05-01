$(document).ready(function() {
	// show
	// delegate to the table as appended/re-appended elements lose the binding to OnClick
	$('#padList').delegate('.modalOpen', 'click', function() {
		let id = $(this).attr('id'); // get id of button clicked
		let split = id.split('.'); // split in substrings
		let padID = split[0]; // first part is the pad id
		let action = split[1]; // second part is the action to do with the pad

		switch (action) {
			case 'join': {
				$('#joinTitle').text('// Join pad ' + '[' + padID + ']');
				$('#joinPad').attr('padID', padID);
				$('#modalJoin').fadeToggle('fast');
				break;
			}
			case 'delete': {
				$('#deleteID').text(padID);
				$('#deleteText').text('Are you sure you want to delete the pad ' + padID + '?');
				$('#modalDelete').fadeToggle('fast');
				break;
			}
		}
	});

	// hide
	$('.close').click(function() {
		let id = $(this).parents('.modal').attr('id'); // get id of modal that is open
		$('#' + id).fadeToggle('fast');
	});
	$('.button-close').click(function() {
		let id = $(this).parents('.modal').attr('id');
		$('#' + id).fadeToggle('fast');
	});
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	switch (event.target) {
		case document.getElementById('modalJoin') : {
			$('#modalJoin').fadeToggle('fast');
			break;
		}
		case document.getElementById('modalDelete'): {
			$('#modalDelete').fadeToggle('fast');
			break;
		}
	}
}