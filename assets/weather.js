var weatherApiKey = "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial";
var searchBtn = document.getElementById(`myButton`);
var homeBtn = document.getElementById("home");
var cityInput = document.getElementById(`userInput`);
var displayToggel = document.getElementById("display");
var locationData;
var tempData;
var conditionData;
var humidityData;
var windData;

// create a div that holds the weather info
function createWeatherHTML() {
  var weatherDiv = document.getElementById("weather");
  var locationEl = document.createElement("h1");
  var tempEl = document.createElement("p");
  locationEl.innerHTML = locationData;
  tempEl.innerHTML =
    "<strong> Temperature: </strong>" +
    tempData +
    "\u00B0F" +
    "<br/>" +
    "<strong> Condition: </strong>" +
    conditionData +
    "<br/>" +
    "<strong> Humidity: </strong>" +
    humidityData +
    "<br/>" +
    "<strong> Wind: </strong>" +
    windData;
  weatherDiv.append(locationEl);
  weatherDiv.append(tempEl);
}

// get weather data when a city value is input into the search bar
async function onSubmit() {
  var weatherApi =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    weatherApiKey;
  fetch(weatherApi)
    .then((response) => response.json())
    .then((response) => {
      // fetch weather data from api
      locationData = response.name;
      tempData = response.main.temp;
      conditionData = response.weather[0].description.toUpperCase();
      humidityData = response.main.humidity;
      windData = response.wind.speed;
      createWeatherHTML();
    })
    .catch((err) => console.error(err));
}

// remove jumbotron when search is made
function removeJumbo() {
  var displayToggel = document.getElementById("display");
  displayToggel.style.display = "none";
}

searchBtn.addEventListener(`click`, onSubmit);
searchBtn.addEventListener(`click`, removeJumbo);
homeBtn.addEventListener("click", refreshPage);

// refresh the page
function refreshPage() {
  location.reload();
}
