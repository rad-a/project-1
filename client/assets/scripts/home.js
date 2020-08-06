$('#logoutBtn').on('click', (e) => {
	$.ajax('/user/logout', {
		method: 'DELETE',
		data: {}
	}).then(user => {
		$.cookie("auth_token", null, { path: '/' });
		window.location.reload;
	});
});