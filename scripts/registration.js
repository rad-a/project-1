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
	
	user.push(userName.val().charAt(0).toUpperCase()); //Generate a pseudo user image using First Initial
	user.push(userName.val()); 
	user.push(dogName.val());
	user.push(dogAge.val());
	user.push(dogBreed.val());
	user.push(dogGender.val());
	
	localStorage.setItem('user',JSON.stringify(user));
	
	registerContainer.hide('fast');
	mainContainer.show('slow');
	
	fillUserData();
}

function fillUserData(){
	user = JSON.parse(localStorage.getItem('user'));
	
	userDataImage.text(user[0]);
	userDataName.text(user[1]);
	userDataPetName.text(user[2]);
	userDataPetAge.text(user[3]);
	userDataPetBreed.text(user[4]);
	userDataPetGender.text(user[5]);
}

function resetUserData(e){
	e.preventDefault();
	localStorage.removeItem('user');
	user = [];
	mainContainer.hide('slow');
	registerContainer.show('slow');
}

// Begin Variables

const mainContainer = $('#mainContainer');
const registerContainer = $('#registerContainer');
const registerForm = $('#registerForm');
const userName = $('#userName');
const dogName = $('#dogName');
const dogAge = $('#dogAge');
const dogBreed = $('#dogBreed');
const dogGender = $('#dogGender');

const userDataImage = $('#profileImage');
const userDataName = $('#userNameDisplay');
const userDataPetName = $('#pet-name');
const userDataPetAge = $('#pet-age');
const userDataPetBreed = $('#pet-breed');
const userDataPetGender = $('#pet-gender');

const resetDataBtn = $('#resetUserData');

var user = [];

// Begin Calls

if(localStorage.getItem('user')){
	mainContainer.show();
	registerContainer.hide();
	fillUserData();
} else {
	mainContainer.hide();
}

registerForm.on('submit',storeUser);
resetDataBtn.on('click',resetUserData);

populateBreeds();

