// const { format } = require("sequelize/types/lib/utils");

const dogAPIKey = 'e5a7d34e-abed-4bdf-80e2-2f1fd529fa6d';


function getBreeds() {
	$.ajax({
       
		url: `https://api.thedogapi.com/v1/breeds?api_key= + ${dogAPIKey}`,
		method: "GET"
	}).then(function (response) {
		//console.log(response);
		for (let i = 0; i < response.length; i++) {
			let option = $('<option>');
			option.attr('value', response[i].name);
			option.text(response[i].name);

			$('#pet-breed').append(option);
		}
        //Set default value
		$('#pet-breed').val('Cardigan Welsh Corgi');
	});
}

// function getAgeRange() {

// }

$('#petSearchForm').on('submit', event => {
    event.preventDefault();

    let queryURL = "http://localhost:8080/pets";

    let queryParams = {};

    let petBreed = $('#pet-breed').val();
    let petGender = $('#pet-gender').val();
    let petAge = $('##pet-age').val();
    let petSize = $('#pet-size').val();
    // petBreed = $('#pet-breed').val();

console.log(queryURL+$param(queryParams))
return queryURL + $.$param(queryParams);



    // const petSearchForm = {
    // pBreed: document.getElementById('pet-breed'),
    // pGender: document.getElementById('pet-gender'),
    // pAge: document.getElementById('pet-age'),
    // pSize: document.getElementById('pet-size'),
    // pSubmit: document.getElementById('petSearchSubmit')
});
// console.log(petSearchForm);

// petSearchForm.pSubmit.addEventListener('click', () => { 
//     // console.log('button pressed');
//     const request = new XMLHttpRequest();

//     request.onload = () => {
//         console.log(request.responseText);
//     }

//     request.open('post', )
// })

// })


// getBreeds();


