$(document).ready(function() {
	var socket = io();

	listPads(); // list all pads in db

	$('#create').click(function() {
		if ($('#newPadID').val()) {
			createPad($('#newPadID').val());
		} else {
			$('#newPadID').notify('// the pad needs a name', {
				position: 'right',
				style: 'transparent',
				className: 'warning' 
			});
			$('#newPadID').focus();
		}
	});

	$('#deletePad').click(function() {
		let padID = $('#deleteID').text();
		deletePad(padID);
		$('#modalDelete').fadeToggle('fast'); // toggle modal
	});

	$('#joinPad').click(function() {
		let username = $('#username').val();
		let usercolor = $('#usercolor').val();
		
		if (username && usercolor) {
			if (usercolor == 'FFFFFF') {
				$('#usercolor').notify('// White will make your text appear invisible', {
				position: 'bottom',
				style: 'transparent',
				className: 'warning' 
			});
			} else {
				let padID = $('#joinPad').attr('padID');
				window.location.href = '/pads/' + padID + '.' + username + '.' + usercolor;
			}
		} else {
			$.notify('// You need an username and a usercolor', {
				style: 'transparent',
				className: 'warning' 
			});
		}
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
			let btnJoin = '<button class="button modalOpen" id="' + pad + '.join">join</button>';
			let btnDelete = '<button class="button button-danger modalOpen" id="' + pad + '.delete">delete</button>';
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
		$.notify('// error getting the pad list: ' + error.responseJSON.message, {
			style: 'transparent',
			className: 'error' 
		});
	});
}

// update (redraw) table
function updateTable() {
	$('#padList').fadeOut('fast', function() {
		$('#padList tbody').empty();
		listPads();
	});
}

// create a new pad (groupless, for now)
function createPad(padID) {
	$.get('/pads/new/' + padID, function(res) {
		//console.log(res);
	})
	.done(function() {
		$.notify('// pad created', {
			style: 'transparent',
			className: 'success' 
		});
		updateTable();
		$('#newPadID').val('');
	})
	.fail(function(error) {
		$.notify('// error creating pad: ' + error.responseJSON.message, {
			style: 'transparent',
			className: 'error' 
		});
	});
}

// delete a registered pad
function deletePad(padID) {
	$.get('/pads/delete/' + padID, function(res) {
		//console.log(res);
	})
	.done(function() {
		$.notify('// Pad deleted', {
			style: 'transparent',
			className: 'success' 
		});
		updateTable();
	})
	.fail(function(error) {
		$.notify('// error deleting pad: ' + error.responseJSON.message, {
			style: 'transparent',
			className: 'error' 
		});
	});
}