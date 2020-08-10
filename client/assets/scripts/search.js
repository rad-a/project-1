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
// let petBreed =
// let petGender = 
// let petAge =
// let petSize =
// let petBreed = $('#pet-breed').val();
// let petGender = $('#pet-gender').val();
// let petAge = $('#pet-age').val();
// let petSize = $('#pet-size').val();

// let petArray = [];

$('#petSearchForm').on('submit', event => {
    event.preventDefault();

    let queryURL = "http://localhost:8080/pets/search";
    $.ajax(queryURL, {
        method: 'GET',
        data: {
            petBreed: $('#pet-breed').val(),
            petGender: $('#pet-gender').val(),
            petAge: $('#pet-age').val()
        }
    }).then(data => {
        // petArray.push(data).value();
        console.log(data)
        return(data);
    })

})
    // let queryParams = {};


    // petBreed = $('#pet-breed').val();

// console.log(queryURL+$param(queryParams))
// return queryURL + $.$param(queryParams);



    // const petSearchForm = {
    // pBreed: document.getElementById('pet-breed'),
    // pGender: document.getElementById('pet-gender'),
    // pAge: document.getElementById('pet-age'),
    // pSize: document.getElementById('pet-size'),
    // pSubmit: document.getElementById('petSearchSubmit')
// });
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


getBreeds();


