$(document).ready(function() {
	listPads();

	$('#create').click(function() {
		if ($('#newPadID').val()) {
			createPad($('#newPadID').val());
		} else {
			$('#newPadID').notify('The pad needs a name', 'warn');
			$('#newPadID').focus();
		}
		
	});

	// delegate to the table as appended/re-appended elements lose the binding to OnClick
	$('#padList').delegate('.delete', "click", function(){
		let id = $(this).attr('id'); // get id of button clicked
		let split = id.split('.'); // split in substrings [format -> id.delete]
		let padID = split[0]; // first part is the pad id
		
		deletePad(padID);
	});
		
});

// list all ether pads
function listPads() {
	$.get('/pads', function(res) {
		let pads = res.padIDs;

		// open table body
		let tableHTML = '<tbody>';
		$('#padList').append(tableHTML);

		pads.forEach(function(pad) {
			let btnJoin = '<a class="button" id="' + pad + '.join" href="/pads/join/' + pad + '">join</a>';
			let btnDelete = '<button class="button button-danger delete" id="' + pad + '.delete">delete</button>';
			let row = '<tr><td>' + pad + '</td><td>' + btnJoin + btnDelete + '</td></tr>';
			
			$('#padList').append(row);
		});

		$('#padList').append('</tbody>'); // close table body
	})
	.done(function() {
		//$.notify('Pad list retrieved', 'info');
		$('#padList').fadeIn('fast');
	})
	.fail(function(error) {
		$.notify('Error getting the pad list: ' + error.responseJSON.message, 'error');
	});
}

// update (redraw) table
function updateTable() {
	$("#padList").fadeOut('fast', function() {
		$("#padList tbody").empty();
		listPads();
	});
	
}

// create a new pad (groupless, for now)
function createPad(padID) {
	$.get('/pads/new/' + padID, function(res) {
		//console.log(res);
	})
	.done(function() {
		$.notify('Pad created', 'success');
		updateTable();
		$('#newPadID').val('');
	})
	.fail(function(error) {
		$.notify('Error creating pad: ' + error.responseJSON.message, 'error');
	});
}

// delete a registered pad
function deletePad(padID) {
	$.get('/pads/delete/' + padID, function(res) {
		//console.log(res);
	})
	.done(function() {
		$.notify('Pad deleted', 'success');
		updateTable();
	})
	.fail(function(error) {
		$.notify('Error deleting pad: ' + error.responseJSON.message, 'error');
	});
}