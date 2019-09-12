// author - vn //
var finderLocation = [];
var useGeolocation = false;
var latitude;
var longitude;

// when browser loads, check if geolocation is available on device
if ("geolocation" in navigator) {
    /* geolocation is available */
    console.log('geolocation available on this device');
} else {
    /* geolocation IS NOT available */
    console.log('geolocation NOT available on this device');
}

// execute when user selects geolocation method
function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    // on success, get long and lat
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        useGeolocation = true;
        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    // check if geolocation is support by browser
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

// function submit form
$(document).ready(function () {
    $('#submit-location').click(function (event) {
        var lostPet = {};
        event.preventDefault();

        // check if user used geolocation
        if (useGeolocation) {
            finderLocation.push(longitude, latitude);
        } else if (!useGeolocation) {
            var inputZip = $('#inputZip').val().trim();
            finderLocation.push(inputZip);
        }
        console.log('--------------------------')
        console.log(`images: ${images.length}`);
        console.log(`form data: ${formData}`);
        console.log(`location: ${finderLocation}`);
        console.log('--------------------------');

        // create array to be pass to the backend
        lostPet = {
            images,
            formData,
            finderLocation
        };
        console.log(`all info passed back: ${lostPet}`)
        sendFormDatatoLostPet(lostPet);
    })
});

// pass all form data to the back /api/lostPet
function sendFormDatatoLostPet(lostPet) {
    // POST request to add burger
    console.log("in form test: " + JSON.stringify(lostPet));
    var route = '/api/addLostPet'
    $.ajax(route, {
        type: 'POST',
        data: lostPet
    }).then((response) => {
        console.log(`POST: ${response}`);
    }).catch(function (err) {
        if (err) throw err;
    })
};

// when user presses geolocation
document.querySelector('#find-me').addEventListener('click', geoFindMe);