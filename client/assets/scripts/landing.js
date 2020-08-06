const resultContainer = $("#resultContainer");
const resultMsg = $("#resultMsg");

$("#userLoginForm").on("submit", (event) => {
	event.preventDefault();

	let API_URL = "http://localhost:8080/user/login";

	$.ajax(API_URL, {
		method: "POST",
		data: {
			username: $("#username").val(),
			password: $("#password").val(),
		},
	})
		.then((data) => {
			console.log(data);
			setCookie("auth_token", data.authToken.token, 7);
			if (!data.user) throw new Error("invalid username or password");
			//window.location.reload();

			switch (data.code) {
				case 400 || 206:
					modifyResultContainer("danger", data);
					break;

				case 200:
					modifyResultContainer("success", data);
					break;

				case 204:
					modifyResultContainer("warning", data);
					break;
			}
		})
		.catch((err) => console.log(err));
});

$("#userRegisterForm").on("submit", (event) => {
	event.preventDefault();
	console.log("form submitted");

	let API_URL = "http://localhost:8080/user/register";

	$.ajax(API_URL, {
		method: "POST",
		data: {
			username: $("#username").val(),
			password: $("#password").val(),
			email: $("#email").val(),
		},
	})
		.then(({ user, authToken }) => {
			if (user && authToken.token) {
				setCookie("auth_token", authToken.token, 7);
				window.location = "/";
			} else {
				throw new Error("something went wrong");
			}
		})
		.catch((err) => alert(err.responseText));
});

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
