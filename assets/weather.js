var weatherApiKey = "c0e0bc244d6e2e1a2584fe5f12098d0b";
var searchBtn = document.getElementById(`myButton`);
var cityInput = document.getElementById(`userInput`);
var homeBtn = document.getElementById("home");
var displayToggel = document.getElementById("display");
var weatherDiv = document.getElementById("weather");
var initialValue = cityInput.value;
var locationData;
var tempData;
var conditionData;
var humidityData;
var windData;

// get weather data when a city value is input into the search bar
async function onSubmit() {
  // if statement to check if city input, check in, and check out all have values
  if (cityInput.value !== "" && checkInInput.value !== "" && checkOutInput.value !== "") {
      // remove event listener to prevent duplicate elements
    searchBtn.removeEventListener("click", onSubmit);
    var weatherApi =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput.value +
      "&appid=" +
      weatherApiKey +
      "&units=imperial";
    fetch(weatherApi)
      .then((response) => response.json())
      .then((response) => {
        // fetch weather data from api
        locationData = response.name;
        tempData = response.main.temp;
        conditionData = response.weather[0].description.toUpperCase();
        humidityData = response.main.humidity;
        windData = response.wind.speed;
        // create the current weather HTML
        currentWeatherCard();
        var cityLat = response.coord.lat.toFixed(2);
        var cityLon = response.coord.lon.toFixed(2);
        // use Lat and Lon from current weather api to use in the one call api
        var weatherFive =
          "https://api.openweathermap.org/data/3.0/onecall?lat=" +
          cityLat +
          "&lon=" +
          cityLon +
          "&exclude=minutely,hourly&units=imperial&appid=" +
          weatherApiKey;
        // fetch five day forecast
        fetch(weatherFive)
          .then((response) => response.json())
          .then((response) => {
            // loop over 5 results
            for (i = 0; i <= 5; i++) {
              // fetch max temp, min temp, and wind speed for 5 days
              var fiveDayMax = response.daily[i].temp.max;
              var fiveDayMin = response.daily[i].temp.min;
              var windSpeed = response.daily[i].wind_speed;
              // add dates with moment 
              let day = moment().add(i, "days").format("l");
              // append new div to existing weather div and make p element that holds information
              var maxTemp = document.createElement("p");
              maxTemp.setAttribute(
                "class",
                "col mx-3 my-3 border border-dark rounded"
              );
              maxTemp.innerHTML =
                "<strong>" +
                day +
                "</strong>" +
                "<br>" +
                "<strong> High: </strong>" +
                fiveDayMax +
                "\u00B0F" +
                "<br>" +
                "<strong> Low: </strong>" +
                fiveDayMin +
                "\u00B0F" +
                "<br>" +
                "<strong> Wind Speed: </strong>" +
                windSpeed;
                weatherDiv.append(maxTemp);
            }
          });
      })
      .catch((err) => console.error(err));
      // if else prompt a modal that asks for inputs to be filled
  } else {
    var modal = document.querySelector(".modal");
    modal.style.display = "block";
    window.onclick = function (event) {
      if (event.target == modal) {
        location.reload();
      }
    };
  }
}

// create a div that holds the weather info
function currentWeatherCard() {
  var currentDiv = document.createElement("div");
  currentDiv.setAttribute("class", "col mx-3 my-3");
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
  currentDiv.append(locationEl);
  currentDiv.append(tempEl);
  weatherDiv.append(currentDiv);
}

// remove jumbotron when search is made
function removeJumbo() {
  searchBtn.removeEventListener("click", removeJumbo);
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
