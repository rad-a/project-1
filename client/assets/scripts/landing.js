const resultContainer = $("#resultContainer");
const resultMsg = $("#resultMsg");

$("#userLoginForm").on("submit", (event) => {
	event.preventDefault();

	let API_URL = "/user/login";

	$.ajax(API_URL, {
		method: "POST",
		data: {
			username: $("#username").val(),
			password: $("#password").val(),
		},
	})
		.then((data) => {
			console.log(data);
			if (!data.user){
				modifyResultContainer('danger',data);
			} else {
				setCookie("auth_token", data.authToken.token, 7);
				window.location = '/';
			}
		})
		.catch((err) => console.log(err));
});

$("#userRegisterForm").on("submit", (event) => {
	event.preventDefault();

	let link = $("#profileImg").val();

	let API_URL = "/user/register";
	if(checkURL(link) || link.length == 0){

		if(link.length == 0){
			link = "https://i.imgur.com/ha9QImO.png";
		}

		$.ajax(API_URL, {
			method: "POST",
			data: {
				username: $("#username").val(),
				password: $("#password").val(),
				email: $("#email").val(),
				profileImg: link
			},
		})
			.then(data => {
				console.log(data);
				if(data.code == 400){
					modifyResultContainer('warning',data);
					return;
				} else {
					const { user, authToken } = data;
					setCookie("auth_token", authToken.token, 7);
					window.location = "/";
				}
				/*if (user && authToken.token) {
					setCookie("auth_token", authToken.token, 7);
					window.location = "/";
				} else {
					throw new Error("something went wrong");
				}*/
			})
			.catch((err) => alert(err.responseText));

	} else {
		modifyResultContainer('warning',{
			code: 401,
			message: "Please enter a valid image link"
		});
	}

	
});

$('#petAddForm').on('submit', event => {
	event.preventDefault();

	let API_URL = "/pets/add";

	$.ajax(API_URL, {
		method: 'POST',
		data: {
			petName: $('#petName').val(),
			petAge: $('#petAge').val(),
			petBreed: $('#petBreed').val(),
			petGender: $('#petGender').val()
		}
	}).then(data => {
		if(data){
			window.location = '/home';
		} else {
			modifyResultContainer('danger',{
				code: 400,
				message: `An error occurred`
			});
		}
	});

});

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function populateBreeds() {
	$.ajax({
		url: "https://api.thedogapi.com/v1/breeds?api_key=e5a7d34e-abed-4bdf-80e2-2f1fd529fa6d",
		method: "GET"
	}).then(function (response) {
		//console.log(response);

		for (var i = 0; i < response.length; i++) {
			var option = $('<option>');
			option.attr('value', response[i].name);
			option.text(response[i].name);

			$('#petBreed').append(option);
		}

		$('#petBreed').val('Cardigan Welsh Corgi');
	});
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function modifyResultContainer(style, data) {
	resultContainer.removeClass();
	switch (style) {
		case "danger":
			resultContainer.addClass("uk-alert uk-alert-danger uk-text-center");
			break;

		case "warning":
			resultContainer.addClass("uk-alert uk-alert-warning uk-text-center");
			break;

		case "success":
			resultContainer.addClass("uk-alert uk-alert-success uk-text-center");
			break;
	}
	resultContainer.show("fast");
	resultMsg.text(`Code ${data.code}: ${data.message}`);
}

resultContainer.hide();
populateBreeds();
