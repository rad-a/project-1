var weatherKey ="c1786506c24426ae384c4cedbae014b0";
//variable to get longitude and latitude for location
//coor  lat: 30.2672
//      lon: -97.7431
//url: "https://api.openweathermap.org/data/2.5/forecast?q=austin&units=imperial&APPID=" + weatherKey,

//one call api for current weather and five day forecast data
$.ajax({
    //use lat and long inputs from google api
    //"https://api.openweathermap.org/data/2.5/onecall?lat=" + latiData + "&lon="+ longData + "&exclude=minutely,hourly&appid="+ weatherKey,
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=minutely,hourly&appid="+ weatherKey,
    method: 'GET',      
    })
.then(function(data){
    
    console.log(data);
    
    attachIcon ();
    getCurrentWeatherData ();
    
   
//attaching weather icon and adding alt tag description
function attachIcon (){ 
    var iconID= data.current.weather.icon;
    var iconURL= "https://api.openweathermap.org/img/w/" + iconID + ".png"
    
    $('#weather-icon').attr('src', iconURL);
    $('#weather-icon').attr('alt', data.current.weather.description);
};

//Retrieve Data for user locations current weather data
function getCurrentWeatherData (){
    //need to find way to get city name and date
    //convert from kelvin to fahrenheit. Remove decimals
    var temp = Math.floor(((data.current.temp)-273) * 1.8 + 32);
    var humidity =data.current.humidity;
    var windSpeed =data.current.wind_speed;
    var uvIndex = data.current.uvi;
    
    $("#temp").append(temp + "*F");
    $("#humidity").append(humidity + "%");
    $("#wind").append(windSpeed + "mph");
    $('#uv-index').append(uvIndex)
};
}); 
