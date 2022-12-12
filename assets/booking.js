var hotelApiKey = "a60b577f96msha1d1d61e590da5bp1a0d89jsnd0048071af3f"; //a60b577f96msha1d1d61e590da5bp1a0d89jsnd0048071af3f
var searchBtn = document.getElementById(`myButton`);
var cityInput = document.getElementById(`userInput`);
var checkInInput = document.getElementById("checkInInput");
var checkOutInput = document.getElementById("checkOutInput");

// pulls hotel details from trip advisor api (requires geoId, and hoteId)
function getHotelInfo() {
  // if statement to check if check in and check out date values exist
  if (checkInInput.value !== "" && checkOutInput.value !== "") {
    // remove event listener to prevent duplicate elements
    searchBtn.removeEventListener("click", getHotelInfo);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": hotelApiKey,
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    };
    // fetch the hotel location api using city input from user inputed text form
    fetch(
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
              hotelCard.setAttribute(
                "class",
                "col mx-3 my-3 border border-dark rounded"
              );
              // place hotel title
              var hotelTitles = document.createElement("h4");
              hotelTitles.innerHTML = hotelTitle;
              hotelTitles.setAttribute("class", "mx-3 my-3");
              hotelDiv.append(hotelCard);
              hotelCard.append(hotelTitles);
              // place hotel image
              var hotelIMGs = document.createElement("img");
              hotelIMGs.setAttribute("class", "mx-3 my-3");
              hotelIMGs.src = hotelIMG;
              hotelIMGs.width = 400;
              hotelIMGs.height = 300;
              hotelCard.append(hotelIMGs);
              // place hotel unit info
              var hotelUnits = document.createElement("dd");
              hotelUnits.setAttribute("class", "mx-3 my-3");
              hotelUnits.innerHTML = hotelUnit;
              hotelCard.append(hotelUnits);
              // place hotel address
              var formAddress = document.createElement("address");
              formAddress.setAttribute("class", "mx-3 my-3");
              formAddress.innerHTML = formattedAddress;
              hotelCard.append(formAddress);
              // place booking url
              var hotelURLs = document.createElement("a");
              hotelURLs.setAttribute(
                "class",
                "btn btn-light mx-3 my-3 border border-dark"
              );
              var urlText = document.createTextNode("Click Here To Book");
              hotelURLs.append(urlText);
              hotelURLs.href = hotelURL;
              hotelCard.append(hotelURLs);
              // add event listener to refresh page on click 
              searchBtn.addEventListener("click", refreshPage);
            }
          })
          .catch((err) => console.error(err));
      });
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

//When button is clicked start onSubmit function
searchBtn.addEventListener(`click`, getHotelInfo);

// gets check in and check out dates as variables for use in the api call
checkInInput.addEventListener("change", checkIn);
checkOutInput.addEventListener("change", checkOut);

function checkIn() {
  checkInInput = this.value;
}

function checkOut() {
  checkOutInput = this.value;
}
