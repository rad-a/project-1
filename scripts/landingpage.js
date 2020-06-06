
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
  const search = $("#searchIcon");
  const userImg = $("#userImg"); // replace based on first name
  const reset = $("#reset");

  //Map and location variables
  const map = $("#map");
  const radiusToggle = $("#radius");
  const address = $("#address");
  const cityZip = $("#cityZip");
  const locationType = $("#type");
  const openHours = $("#hours");
  const desc = $("desc");
  const site = $("#website");
  const locationImg = $("locationImg");

  //Weather variables
  const currentWeatherEl = $('#currentWeather');
  const locationInput = $('#locationInput').val().trim();
  const locationEl = $('.location');
  const currentDateEl = $('#currentDate');
  const currentIconEl = $('#weatherIcon');
  const currentDescEl = $('#currentWeatherDesc');
  const currentTempEl = $('#currentTemp');
  const currentHumidityEl = $('#currentHumidity');
  const currentWindEl = $('#currentWind');
  const currentUVEl = $('#currentUV');
  const forecast = $('.forecast');
  const futureDate = $('.futureDate');
  const forecastIcon = $('.forecastIcon');
  const forecastDesc = $('.forecastDesc');
  const tempForecast = $('.tempForecast');
  const humidityForecast = $('.humidityForecast');
  const uvForecast = $('.uvForecast');

  //Begin  functions

//Map function 
function renderMap() {

 }

//Weather forecast function
 function getForecast() {

 }




    //Display forecast and pins for nearby parks on map
  areaSearch.on("submit", renderMap, getForecast);

  //Reset search 
  $("#reset").click(function(){
    $(areaSearch)[0].reset();
    });});
