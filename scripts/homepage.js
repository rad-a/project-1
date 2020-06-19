//TODO:
//get results
//persist results
//Toggle radius
//Clear search history
//Change title text per search
//Add location name to "weather forecast" text
//Render park details
//Replace user image based on first letter

$(document).ready(function () {
  //Search variables
  var areaSearch = $("#areaSearch");
  var searchInput = $("#searchInput");
  var search = $("#searchBtn");
  var userImg = $("#profileImage");
  var reset = $("#reset");

  //Map and location variables
  //   var map = $("#map");
  //   var radiusToggle = $("#radius");
  let hideText = $("#hide");

  //   var address = $("#address");
  //   var cityZip = $("#cityZip");
  //   var locationType = $("#type");
  //   var openHours = $("#hours");
  //   var desc = $("desc");
  //   var site = $("#website");
  //   var locationImg = $("locationImg");


  //BEGIN FUNCTIONS
  
  var weatherKey = "c1786506c24426ae384c4cedbae014b0";
  var latiData;
  var longData;
  //weather data variables defined
  
  
  //one call version of openweather api for current weather and five day forecast data

$.ajax({
    //use lat and long inputs from geolocation
    url:"https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&units=imperial&exclude=minutely,hourly&appid=" +
    weatherKey,
     
    method: "GET",
  }).then(function (data) {
    console.log(data);
    
    getLocation();
    attachIcon();
    getCurrentWeatherData();
    getForecastData ();
  

    function getLocation () {
      if (navigator.geolocation){
        // console.log('gps')
        navigator.geolocation.getCurrentPosition(function (position) {
        coord= {
            lat: position.coords.latitude,
            lng:position.coords.longitude,
            accuracy:position.coords.accuracy
        };
        let latiData = coord.lat;
        let longData = coord.lng;
        console.log(latiData)
        console.log(longData)
        })}
        else {
        let latiData = 30.2672
        let longData = -97.7431
        console.log(latiData);
        console.log(longData);
        };
        
      };
   

    //attaching weather icon and adding alt tag description
    function attachIcon() {
      var iconID = data.current.weather[0].icon;

      var iconURL = "https://api.openweathermap.org/img/w/" + iconID + ".png";

      $("#weather-icon").attr("src", iconURL);
      $("#weather-icon").attr("alt", data.current.weather.description);
    }

    //Retrieve Data for user location's current weather data
    function getCurrentWeatherData() {
      //use moment js for date
      var currentDate= {now: moment().format("dddd, MMMM Do")};
      var temperature = Math.floor(data.current.temp) + "°F";
      var humidity = data.current.humidity + "%";
      var windSpeed = data.current.wind_speed + "mph";
      var uvIndex = data.current.uvi;
      $("#currentDate").append(currentDate.now);
      $("#temp").append(temperature);
      $("#humidity").append(humidity);
      $("#wind").append(windSpeed);
      $("#uv-index").append(uvIndex);
    };
  
    
    function getForecastData() {
      
      for (var i=0; i<=4; i++) {
      //generate parent_div with viewport responsive class. 
      //add 1 day to current date and add class to keep centered
      var parent_div = $("<div>", {class: "uk-grid-match uk-grid-column-small uk-grid-divider weatherEl"});
      var forecastDates = $("<ul>").text(moment().add(i+1, 'days').format("dddd, MMMM Do"));
      //variables for retrieving icon image 
      var iconData = data.daily[i].weather[0].icon;
      var iconURLForecast = "https://api.openweathermap.org/img/w/" + iconData + ".png";
      var forecastIconIMG = $("<img>", {src: iconURLForecast, alt: forecastDesc})
      //create li for each forecast item and append weather data from api
      var forecastDesc = $("<li></li>").text(data.daily[i].weather[0].description);
      var forecastTemp = $("<li></li>").text("Temperature: " + Math.floor(data.daily[i].temp.day) + "°F");
      var forecastHumidity = $("<li></li>").text("Humidity: " + data.daily[i].humidity + "%");
      var forecastWindSpeed = $("<li></li>").text("Wind speed:" + data.daily[i].wind_speed + "mph");
      var forecastUV = $("<li></li>").text("UV Index: " + data.daily[i].uvi);
      //create ul, attach li's and append to parent_div
      var weatherListStart = $("<div>").append(forecastDates);
      weatherListStart.css("list-style-type", "none");
      weatherListStart.attr("class", "List");
      //finish loop by appending to html forecast_container div
      $("#weather").append(parent_div);
      parent_div.append(weatherListStart);
      weatherListStart.append(forecastDates);
      weatherListStart.append(forecastIconIMG);
      weatherListStart.append(forecastDesc);
      weatherListStart.append(forecastTemp);
      weatherListStart.append(forecastHumidity);
      weatherListStart.append(forecastWindSpeed);
      weatherListStart.append(forecastUV);
    
     /* $(".forecast-temp").append(forecastTemp);
      $(".forecast-hum").append(forecastHumidity);
      $(".forecast-wind").append(forecastWindSpeed);
      $(".forecast-uv").append(forecastUV);*/
    }};
    
    function setPage() {
      $(hideText).attr("class", "hide");
    }

    //Render results on "search" button click
    $(search).on(
      "click",
      setPage,
      attachIcon,
      getCurrentWeatherData,
      getForecastData
    );

    //Reset search
    //Need to figure out how to make this function properly
    $("#reset").click(function () {
      $(areaSearch)[0].reset();
    });
  });
});
