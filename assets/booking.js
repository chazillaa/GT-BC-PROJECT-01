var hotelApiKey = "ab64e98c11msh399e1e4a32c7e2fp14ff54jsn7954d56bfedc";
var searchBtn = document.getElementById(`myButton`);
var cityInput = document.getElementById(`userInput`);
var checkInInput = document.getElementById("checkInInput");
var checkOutInput = document.getElementById("checkOutInput");

// pulls hotel details from trip advisor api (requires geoId, and hoteId)
async function getHotelInfo() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": hotelApiKey,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  // fetch the hotel location api using city input from user inputed text form
  await fetch(
    "https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-us&name=" +
      cityInput.value,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // grab the destination id from api
      var destinationId = parseInt(response[0].dest_id);
      // fetch hotel information api by using destination id provided in the hotel location api
      fetch(
        // use to test without date input (comment out checkInInput/checkOutInput and the checkInInput/checkOutInput event listeners) 
        // "https://booking-com.p.rapidapi.com/v1/hotels/search?room_number=1&checkin_date=2022-12-10&checkout_date=2022-12-20&units=metric&order_by=popularity&adults_number=1&filter_by_currency=USD&locale=en-us&dest_id=" +
        //   destinationId +
        //   "&dest_type=city",
        "https://booking-com.p.rapidapi.com/v1/hotels/search?room_number=1&checkin_date=" +
          checkInInput +
          "&checkout_date=" +
          checkOutInput +
          "&units=metric&order_by=popularity&adults_number=1&filter_by_currency=USD&locale=en-us&dest_id=" +
          destinationId +
          "&dest_type=city",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          // for loop to loop through the response
          for (i = 0; i < response.result.length; i++) {
            // hotel names from api
            var hotelTitle = response.result[i].hotel_name;
            // hotel address from api then fomrmated into one variable
            var hotelAddress = response.result[i].address;
            var hotelCity = response.result[i].city_trans;
            var hotelZip = response.result[i].zip;
            var formattedAddress =
              hotelAddress + "<br>" + hotelCity + "<br>" + hotelZip;
            // hotel unit details from api
            var hotelUnit = response.result[i].unit_configuration_label;
            // hotel booking url from api
            var hotelURL = response.result[i].url;
            // main hotel image from api
            var hotelIMG = response.result[i].max_photo_url;

            // grab existing hotel div
            var hotelDiv = document.getElementById("hotel");
            // create new divs to take hotel information
            var hotelCard = document.createElement("div");
            hotelCard.setAttribute("class", "col");
            // place hotel title
            var hotelTitles = document.createElement("h4");
            hotelTitles.innerHTML = hotelTitle;
            hotelDiv.append(hotelCard);
            hotelCard.append(hotelTitles);
            // place hotel image
            var hotelIMGs = document.createElement("img");
            hotelIMGs.src = hotelIMG;
            hotelIMGs.width = 400;
            hotelIMGs.height = 300;
            hotelCard.append(hotelIMGs);
            // place hotel unit info
            var hotelUnits = document.createElement("dd");
            hotelUnits.innerHTML = hotelUnit;
            hotelCard.append(hotelUnits);
            // place hotel address
            var formAddress = document.createElement("address");
            formAddress.innerHTML = formattedAddress;
            hotelCard.append(formAddress);
            // place booking url
            var hotelURLs = document.createElement("a");
            hotelURLs.setAttribute(
              "class",
              "btn btn-light my-2 my-xl-0 border border-secondary"
            );
            var urlText = document.createTextNode("Click Here To Book");
            hotelURLs.append(urlText);
            hotelURLs.href = hotelURL;
            hotelCard.append(hotelURLs);
          }
        })
        .catch((err) => console.error(err));
    });
}

//When button is clicked start onSubmit function
searchBtn.addEventListener(`click`, getHotelInfo);

//gets check in and check out dates as variables for use in the api call
checkInInput.addEventListener("change", checkIn);
checkOutInput.addEventListener("change", checkOut);

function checkIn() {
  checkInInput = this.value;
}

function checkOut() {
  checkOutInput = this.value;
}
