$(document).ready(function() {
	// show
	$('#modalTest').click(function() {
		$('#modalJoin').fadeToggle('fast');
	});

	// hide
	$('.close').click(function() {
		$('#modalJoin').fadeToggle('fast');
	});
	$('#closeModal').click(function() {
		$('#modalJoin').fadeToggle('fast');
	});
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById('modalJoin')) {
    $('#modalJoin').fadeToggle('fast');
  }
}