// author - vn //
var finderLocation = [];
var useGeolocation = false;
var latitude;
var longitude;

// when browser loads, check if geolocation is available on device
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("geolocation available on this device");
} else {
  /* geolocation IS NOT available */
  console.log("geolocation NOT available on this device");
}

// execute when user selects geolocation method
function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  // on success, get long and lat
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    useGeolocation = true;
    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  // check if geolocation is support by browser
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// function submit form
$(document).ready(function() {
  $("#submit-location").click(function(event) {
    var lostPet = {};
    event.preventDefault();

    // check if user used geolocation
    if (useGeolocation) {
      finderLocation.push(longitude, latitude);
    } else if (!useGeolocation) {
      var inputZip = $("#inputZip")
        .val()
        .trim();
      finderLocation.push(inputZip);
    }
    console.log("--------------------------");
    console.log(`images: ${images.length}`);
    console.log(`form data: ${formData}`);
    console.log(`location: ${finderLocation}`);
    console.log("--------------------------");

    // create array to be pass to the backend
    lostPet = {
      images: images,
      formData,
      finderLocation
    };
    sendFormDatatoLostPet(lostPet);
  });
});

// pass all form data to the back /api/lostPet
function sendFormDatatoLostPet(lostPet) {
  var currentImages = lostPet["images"];
  console.log("ere ibs the back: " + currentImages);
  var formData = new FormData();
  formData.append("image", images[0]);
  //add petPictures
  axios({
    method: "POST",
    url: "/api/upload",
    data: formData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
    .then(function(response) {
      //handle success
      lostPet["images"][0] = response.data.url;
      // POST request to add burger
      var route = "/api/addLostPet";
      $.ajax(route, {
        type: "POST",
        data: lostPet
      })
        .then(function(respsonse) {
          callComparePet(lostPet);
        })
        .catch(function(err) {
          if (err) throw err;
        });
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
}

function callComparePet(pet) {
  $.ajax("/api/compare", {
    type: "POST",
    data: pet
  }).then(function(res) {
    console.log(`POST: ${res}`);
  });
}

function addPetInfoToDisplay(listOfComparedPets) {
  //show  modal
  $("#compareModal").modal("show");

  //fill the modal from all the available pets
  for (var i = 0; i < listOfComparedPets.length; i++) {
    var firstPetObj = listOfComparedPets[i].pet;
  }
}

// when user presses geolocation
document.querySelector("#find-me").addEventListener("click", geoFindMe);
