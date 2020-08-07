$('#logoutBtn').on('click', (e) => {
	$.ajax('/user/logout', {
		method: 'POST',
		data: {}
	}).then(data => {
		document.cookie = "auth_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		window.location = "/";
	});
});