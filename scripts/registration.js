// JavaScript Document

// Begin Functions

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

			$('#dogBreed').append(option);
		}

		$('#dogBreed').val('Cardigan Welsh Corgi');
	});
}

function storeUser(e){
	e.preventDefault();
	
	user.push(userName.val());
	user.push(dogName.val());
	user.push(dogAge.val());
	user.push(dogBreed.val());
	user.push(dogGender.val());
	
	localStorage.setItem('user',JSON.stringify(user));
}

// Begin Variables

const registerContainer = $('#registerContainer');
const registerForm = $('#registerForm');
const userName = $('#userName');
const dogName = $('#dogName');
const dogAge = $('#dogAge');
const dogBreed = $('#dogBreed');
const dogGender = $('#dogGender');
const registerButton = $('#registerSubmit');

const user = [];

// Begin Calls

if(localStorage.getItem('user')){
	registerContainer.hide();
}

registerForm.on('submit',storeUser);

populateBreeds();