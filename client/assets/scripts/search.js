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

//Get pet based on user-input

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
    }).then(function(data) {
        // petArray.push(data).value();
        console.log(data)
        
        // return(data);
        $("#allUsers").html('');

    

    // let results = data.response[i];

// getSearcResults(data)
    for(let i = 0; i < data.length; i++ ) {
        let petMatch = data.response[i];
        function insert() {
            $('#allUsers').append()
            $('<div class="cell users">').prepend($('#allUsers'));
            $('<div class="textOverlay textCtr">').prepend($('#allUsers'));

        
        // let petMatchDiv = allUsers;
        let usersPet = $('<div class="cell users">'); //
          let match = $('<div class="textOverlay textCtr">'); //textOverlay textCtr
            let matchName = $('<h5 class="user-name">' + petMatch[i].petName + '</h5>');//user-name
            let matchFlex = $('<div class="makeFlex">'); //makeFlex
                let overlay = $('<div class="overlayInfo float-left">');//overlayInfo float-left
                    // let matchP = $('<p></p>')
                        // let matchIcon = $('<i class="fa fa-paw big"') ;
                        // let matchpetNum = $('<span class="pet">');
            let overlayColor = $('<div class="overlay ctr">');
            let matchLink = $('<a href="/profile/'+ petMatch[i].UserId + '">')
            let matchBtn = $('<button class="hollow button small primary" type="button">View Profile!</button>')

            $(matchLink).append(matchBtn);
            $(overlayColor).append(matchLink);
            $(matchP).append(matchpetNum);
            $(matchP).prepend(matchIcon);
            $(overlay).append(matchP);
            $(matchFlex).append(overlay);
            $(match).append(matchFlex);
            $(match).prepend(matchName);
            $(usersPet).prepend(match);
            $(usersPet).append(overlayColor);


        $("#allUsers").append(usersPet);
        console.log("user id:" + petMatch.UserId);
}}

    })
})

getBreeds();
insert();



