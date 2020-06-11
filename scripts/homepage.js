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
  const areaSearch = $("#areaSearch");
  const searchInput = $("#searchInput");
  const search = $("#searchBtn");
  const userImg = $("#profileImage");
  const reset = $("#reset");

  //Map and location variables
  //   const map = $("#map");
  //   const radiusToggle = $("#radius");
  let hideText = $("#hide");

  //   const address = $("#address");
  //   const cityZip = $("#cityZip");
  //   const locationType = $("#type");
  //   const openHours = $("#hours");
  //   const desc = $("desc");
  //   const site = $("#website");
  //   const locationImg = $("locationImg");

  
  //BEGIN FUNCTIONS

  var weatherKey = "c1786506c24426ae384c4cedbae014b0";
  //variable to get longitude and latitude for location
 
  //one call version of openweather api for current weather and five day forecast data
  $.ajax({
    //use lat and long inputs from geolocation
    //"https://api.openweathermap.org/data/2.5/onecall?lat=" + latiData + "&lon="+ longData + "&exclude=minutely,hourly&appid="+ weatherKey,
    url:
      "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&units=imperial&exclude=minutely,hourly&appid=" +
      weatherKey,
    method: "GET",
  }).then(function (data) {
    console.log(data);

    attachIcon();
    getCurrentWeatherData();
    getForecastData ();

    //attaching weather icon and adding alt tag description
    function attachIcon() {
      var iconID = data.current.weather[0].icon;

      var iconURL = "https://api.openweathermap.org/img/w/" + iconID + ".png";

      $("#weather-icon").attr("src", iconURL);
      $("#weather-icon").attr("alt", data.current.weather.description);
    }

    //Retrieve Data for user location's current weather data
    function getCurrentWeatherData() {
      //need to find way to get city name and date
      //convert from kelvin to fahrenheit. Remove decimals
      var temperature = Math.floor(data.current.temp) + "°F";
      var humidity = data.current.humidity + "%";
      var windSpeed = data.current.wind_speed + "mph";
      var uvIndex = data.current.uvi;

      $("#temp").append(temperature);
      $("#humidity").append(humidity);
      $("#wind").append(windSpeed);
      $("#uv-index").append(uvIndex);
    };

    function getForecastData() {
      var i=0;
      //div to which all data will be added before being appeneded to html
      var parent_div = $("<div>", {class: "forecast uk-width-1-2@s uk-width-1-3@m uk-width-1-5@l"});
      //object to hold weather data
      const forecastObject= [{
        iconIMG: function (){
          var iconData = data.daily[i].weather[0].icon;
          var iconURLForecast = "https://api.openweathermap.org/img/w/" + iconData + ".png";
          $("<img>", {src: iconURLForecast, alt: forecastDesc})
        },
        description: data.daily[i].weather[0].description,
        temperature: "Temperature: " + Math.floor(data.daily[i].temp.day) + "°F",
        humidity: "Humidity: " + data.daily[i].humidity + "%",
        wind_speed: "Wind speed:" + data.daily[i].wind_speed + "mph",
        uvIndex: "UV Index: " + data.daily[i].uvi
      },
      ];
      //for each method, li and text and append
      forecastObject.forEach(myFunction)
       function myFunction() {
        var listItem= $("<li></li>").append(value);
        weatherListStart.append(listItem)
        parent_div.append(value);
        
      };
      //ul for generated li's to append to
      var weatherListStart = $("<ul></ul", {class: "weatherList"});
      weatherListStart.css("list-style-type", "none")
      //finally append ul to parent div and parent div to html
      parent_div.append(weatherListStart);
      $("#forecast_container").append(parent_div);
    }; 
     /* //generate div with viewport responsive class. ul of weather data will be appended
      var parent_div = $("<div>", {class: "forecast uk-width-1-2@s uk-width-1-3@m uk-width-1-5@l"});
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
      var weatherListStart = $("<ul></ul", {class: "weatherList"});
      weatherListStart.css("list-style-type", "none")
      //array
      //var forecastDataArray = [forecastIconIMG, forecastDesc, forecastTemp, forecastHumidity, forecastWindSpeed, forecastUV]
      
      //finish loop by appending to html forecast_container div
      $("#forecast_container").append(parent_div);
      parent_div.append(weatherListStart);
      weatherListStart.append(forecastIconIMG);
      weatherListStart.append(forecastDesc);
      weatherListStart.append(forecastTemp);
      weatherListStart.append(forecastHumidity);
      weatherListStart.append(forecastWindSpeed);
      weatherListStart.append(forecastUV);
    
      $(".forecast-temp").append(forecastTemp);
      $(".forecast-hum").append(forecastHumidity);
      $(".forecast-wind").append(forecastWindSpeed);
      $(".forecast-uv").append(forecastUV);
    }
    <div
                class="forecast uk-width-1-2@s uk-width-1-3@m uk-width-1-5@l"
              >
                <div class="forecast-date"></div>
                <img class="forecast-icon" alt="" />

                <div class="forecast-desc"></div>*/

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
