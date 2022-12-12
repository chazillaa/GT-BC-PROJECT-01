var searchBtn = $(`#myButton`);
var cityInput = document.getElementById(`userInput`);

//gets weather data when a city value is input into the search bar 
function onSubmit() {
  var weatherApi =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput.value +
    "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial";
  fetch(weatherApi)
    .then((response) => response.json())
    .then((data) => {
      //FETCHING API DATA
      var locationData = data.name;
      var tempData = data.main.temp;
      var conditionData = data.weather[0].description.toUpperCase();
      var humidityData = data.main.humidity;
      var windData = data.wind.speed;
      //PUTTING API DATA INTO HTML
      // currentLocation.innerHTML = locationData
      $(`#location`).text(locationData);
      $(`#temp`).text(`Temperature: ` + tempData);
      $(`#condition`).text(`Condition: ` + conditionData);
      $(`#humidity`).text(`Humidity: ` + humidityData);
      $(`#wind`).text(`Wind Speed: ` + windData);
    });
  // CONSOLE LOG API URL
  console.log("openweather api" + weatherApi);
}

//pulls hotel details from trip advisor api (requires geoId, and hoteId) // need to add a way to loop through at least 5 hotels and get the hotel details for each individual hotel
function getHotelInfo() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cbe3df9b09msh53726daa1339c0ep14b1c6jsn3568cc486735",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  fetch(
    "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=" +
      cityInput.value,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      var locationId = parseInt(response.data[0].geoId);
      console.log(locationId)
      console.log(response);
      fetch(
        `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=` +
          locationId +
          `&checkIn=2022-12-08&checkOut=2022-12-09&pageNumber=1&currencyCode=USD`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          var hotelId = parseInt(response.data.data[0].id);
          console.log(hotelId);
          console.log(response);
          fetch(
            "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails?id=" + hotelId +"&checkIn=2022-12-07&checkOut=2022-12-10&currency=USD",
            options
          )
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
        });
    });
}

//When button is clicked start onSubmit function
$(`#myButton`).on(`click`, onSubmit);
$(`#myButton`).on(`click`, getHotelInfo);