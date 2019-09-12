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

        if (useGeolocation) {
            finderLocation.push(longitude, latitude);
        } else if (!useGeolocation) {
            var inputAddress = $('#inputAddress').val().trim();
            var inputCity = $('#inputCity').val().trim();
            var inputZip = $('#inputZip').val().trim();

            finderLocation.push(inputAddress, inputCity, inputZip);
        }
        console.log('--------------------------')
        console.log(`images: ${images.length}`);
        console.log(`form data: ${formData}`);
        console.log(`location: ${finderLocation}`);
        console.log('--------------------------')

        lostPet = {
            pet_image1: 'base64-one',
            pet_image2: 'base64-two',
            pet_image3: 'base64-three',
            pet_type: 'dog',
            pet_breed: 'poodle',
            color: 'pink',
            coat_type: 'curly',
            sex: 'male',
            pet_size: 'small',
            last_zip: 10000,
            finder_name: 'vincent',
            finder_phone: '714-415-8081',
            finder_email: 'finder@gmail.com'
        };

        console.log('find.geolocatoin.js | lostpet: ' + JSON.stringify(lostPet))
        // sendFormDatatoLostPet(lostPet);
    })
});

// pass all form data to the back /api/lostPet
function sendFormDatatoLostPet(lostPet) {
    // POST request to add burger
    console.log("in form test: " + lostPet);
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