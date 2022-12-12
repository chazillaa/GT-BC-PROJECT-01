// variables to use to display data
var locationData;
var tempData;
var conditionData;
var humidityData;
var windData;

// Define a baseURL and key to as part of the request URL

const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const key = 'c0e0bc244d6e2e1a2584fe5f12098d0b';

// Grab references to all the DOM elements we need to maniuplate
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const section = document.querySelector('section');


//const checkInDate = document.querySelector('.checkInDate');
//const checkOutDate = document.querySelector('.checkOutDate');
//const div = document.querySelector('.weather');
//const div1 = document.querySelector('.hotel');


// Event listeners to control the functionality
searchForm.addEventListener('submit', submitSearch);

function submitSearch(e) {
    fetchResults(e);
}

function fetchResults(e) {
    // Use preventDefault() to stop the form submitting
    e.preventDefault();
  
    // Assemble the full URL
    let url = `${baseURL}?q=${searchTerm.value}&appid=${key}&units=imperial`;

    // Use fetch() to make the request to the API
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    //fetch(url, requestOptions)
    //.then(response => response.json() )
    //.then(json => displayResults(json) )
    //.catch( error => console.error(`Error fetching data: ${error.message}`) );
    
   
    fetch(url, requestOptions)
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

        // Display the results
function displayResults(json) {
    //while (section.firstChild) {
     // section.removeChild(section.firstChild);
   // }
  
    const weather = json.response.docs;

    // Check if result was returned if not, log error
    if (weather.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results returned.'
        section.appendChild(para);
      } else {
        // If results returned, create the elements needed to display the data
        for (const current of weather) {
          const article = document.createElement('article');
          const heading = document.createElement('h1');
          const temp = document.createElement('p');
          const condition = document.createElement('p');
          const humid = document.createElement('p');
          const wind = document.createElement('p');
          const keywordPara = document.createElement('p');
          keywordPara.classList.add('keywords');

          console.log(current);
          
          heading.textContent = current.name;
          temp.textContent = current.main.temp; 
          condition.textContent = current.weather.description;
          humid.textContent = current.main.humidity;
          wind.textContent = current.wind.speed;
          keywordPara.textContent = 'Keywords: ';
          for (const keyword of current.keywords) {
            const span = document.createElement('span');
            span.textContent = `${keyword.value} `;
            keywordPara.appendChild(span);
          }

          article.appendChild(heading);
          article.appendChild(temp);
          article.appendChild(condition);
          article.appendChild(humid);
          article.appendChild(wind);
          article.appendChild(keywordPara);
          section.appendChild(article);
        }
      }
};



