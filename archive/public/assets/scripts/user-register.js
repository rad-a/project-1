const registerForm = $('#registerForm');
const userName = $('#userName');
const dogName = $('#dogName');
const dogAge = $('#dogAge');
const dogBreed = $('#dogBreed');
const dogGender = $('#dogGender');

/*
const userDataImage = $('#profileImage');
const userDataName = $('#userNameDisplay');
const userDataPetName = $('#pet-name');
const userDataPetAge = $('#pet-age');
const userDataPetBreed = $('#pet-breed');
const userDataPetGender = $('#pet-gender');
*/

$("#userRegisterForm").on('submit', event => {
    event.preventDefault();

    let API_URL = 'localhost:8080/api/login';

    $.ajax({
        url: API_URL,
        method: 'POST',
        email: $('#email').val(),
        password: $('#password').val()
    }).then(data => {
        switch(data.status){
            case 200:
                $('#result').text('User logged in');
                break;

            case 204:
                $('#result').text('Incorrect password');
                break;
            
            case 206:
                $('#result').text('User does not exist');
                break;

            case 400:
                $('#result').text('Error occured');
                break;
        }
    });
})