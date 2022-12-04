let searchBtn = $(`#myButton`)
let cityInput = document.getElementById(`userInput`) //ask question tomorrow about why $(`#userInput`) doesnt work

//gets weather data when a city value is input into the search bar
function onSubmit(){
    var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial"
    fetch(weatherApi)
    .then(response => response.json())
    .then(data => {
        //FETCHING API DATA
        let locationData = data.name
        let tempData = data.main.temp
        let conditionData = data.weather[0].description.toUpperCase()
        let humidityData = data.main.humidity
        let windData = data.wind.speed
        //PUTTING API DATA INTO HTML
        // currentLocation.innerHTML = locationData
        $(`#location`).text(locationData)
        $(`#temp`).text(`Temperature: ` + tempData)
        $(`#condition`).text(`Condition: ` + conditionData)
        $(`#humidity`).text(`Humidity: ` + humidityData)
        $(`#wind`).text(`Wind Speed: ` + windData)
       
    })
    // CONSOLE LOG API URL
    console.log(weatherApi)
}


//When button is clicked start onSubmit function
$(`#myButton`).on(`click`, onSubmit)
// $(`#myButton`).on(`enter`, searchTrip)

$(`#userInput`).keydown(function(event) {
    if(event.keyCode === 13) {
        (onSubmit)
    }
})






































































// let searchBtn = $(`#myButton`)
// let cityInput = document.getElementById(`userInput`) //ask question tomorrow about why $(`#userInput`) doesnt work

// //gets weather data when a city value is input into the search bar
// function onSubmit(){
//     var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial"
//     fetch(weatherApi)
//     .then(response => response.json())
//     .then(data => {
//         //FETCHING API DATA
//         let locationData = data.name
//         let tempData = data.main.temp
//         let conditionData = data.weather[0].description.toUpperCase()
//         let humidityData = data.main.humidity
//         let weatherIcon = data.weather[0].icon
//         let windData = data.wind.speed
//         //PUTTING API DATA INTO HTML
//         // currentLocation.innerHTML = locationData
//         $(`#icon`).html(weatherIcon);
//         $(`#location`).text(locationData)
//         $(`#temp`).text(`Temperature: ` + tempData)
//         $(`#condition`).text(`Condition: ` + conditionData)
//         $(`#humidity`).text(`Humidity: ` + humidityData)
//         $(`#wind`).text(`Wind Speed: ` + windData)
       
//     })
//     // CONSOLE LOG API URL
//     console.log(weatherApi)
// }
// //When button is clicked start onSubmit function
// $(`#myButton`).on(`click`, onSubmit)
// $(`#myButton`).on(`enter`, onSubmit)


// let searchBtn = $(`#myButton`)
// let cityInput = document.getElementById(`userInput`) //ask question tomorrow about why $(`#userInput`) doesnt work

// // let currentLocation = document.getElementById(`location`)
// // let currentTemp = document.getElementById(`temp`)
// // let currentCondition = document.getElementById(`condition`)
// // let currentHumidity = document.getElementById(`humidity`)
// // let city;
// // let cities;

// //gets weather data when a city value is input into the search bar
// function onSubmit(){
//     var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial"
//     fetch(weatherApi)
//     .then(response => response.json())
//     .then(data => {
//         //FETCHING API DATA
//         let locationData = data.name
//         let tempData = data.main.temp
//         let conditionData = data.weather[0].description
//         let humidityData = data.main.humidity
//         //PUTTING API DATA INTO HTML
//         // currentLocation.innerHTML = locationData
//         $(`#location`).text(locationData)
//         $(`#temp`).text(tempData)
//         $(`#condition`).text(conditionData)
//         $(`#humidity`).text(humidityData)
//     })
//     // CONSOLE LOG API URL
//     console.log(weatherApi)
// }
// //When button is clicked start onSubmit function
// $(`#myButton`).on(`click`, onSubmit)



// $(`#myButton`).on(`click`, onSubmit)
// // let cityInput = document.querySelector(`#userInput`)
// let cityInput = $(`#userInput`).val()

// function onSubmit(){
//     console.log(cityInput)
// }

// function onSubmit() {
//     var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial"
//     console.log(weatherApi)
//     $.ajax({
//         url: weatherApi,
//         method: "GET",
//       }).then(function(response){
//         let cityName = response.name
//         let cityTemp = response.main.temp
//         $(`#location`).html(cityName)
//         $(`#temp`).text(cityTemp)
//       })
//     }




//     function getCity() {
//         city = $("#city-input").val();
//         if (city && cities.includes(city) === false) {
//           saveToLocalStorage();
//           return city;
//         } else if (!city) {
//           alert("Please enter a valid city");
//         }
//       }






























//THIS CODE WORKS
// let searchBtn = document.getElementById(`myButton`)
// let cityInput = document.getElementById(`userInput`)
// let currentLocation = document.getElementById(`location`)
// let currentTemp = document.getElementById(`temp`)
// let currentCondition = document.getElementById(`condition`)
// let city;
// let cities;

// function onSubmit(){
//     var weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=c0e0bc244d6e2e1a2584fe5f12098d0b&units=imperial"
//     fetch(weatherApi)
//     .then(response => response.json())
//     .then(data => {
//         let locationData = data.name
//         let tempDate = data.main.temp
//         let conditionData = data.weather[0].description
//         let humidityData = data.main.humidity
//         console.log(humidityData)

//         currentLocation.innerHTML = locationData
//         currentTemp.innerHTML = tempDate
//         currentCondition.innerHTML = conditionData
//     })

//     currentLocation.innerHTML
   
//     console.log(weatherApi)
// }

// searchBtn.addEventListener(`click`, onSubmit)























//AIRBNB
// let searchBtn = $(`#myButton`)

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'cbe3df9b09msh53726daa1339c0ep14b1c6jsn3568cc486735',
// 		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
// 	}
// };


// function onSubmit(){
// fetch('https://airbnb13.p.rapidapi.com/search-location?location=Atlanta&checkin=2022-12-03&checkout=2022-12-05&adults=2&children=0&page=1', options)
// .then(response => response.json())
// .then(response => {
//     let link = response.results[0].deeplink
//     $(`#location`).html(link)
//     console.log(link)
//     console.log(response)
//     let images = response.results[0].images[0]
//     $(`#temp`).html(images)
// })
// .catch(err => console.error(err));
// }

// $(`#myButton`).on(`click`, onSubmit)