// author - vn //
var finderLocation = [];
var useGeolocation = false;
var latitude;
var longitude;

$('#modal-spinner').hide();
$('#show-map-button').hide();
$('#status').hide();

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
    $('#modal-spinner').show();
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
        mapLink.textContent = `Geolocation Successful! Show map`;
        finderLocation.push(latitude, longitude);
        $('#modal-spinner').hide();
        $('#find-me').hide();
        $('#show-map-button').show();
        $('#show-map-button').append(`<a href="${mapLink.href}">`)
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

// 
// function submit form
$(document).ready(function () {
    $(document).on('click', '#submit-location', function (event) {
        var lostPet = {};

        // ===================================
        // NEED TO ADD S3 TO CONVERT B64 BEFORE STORING TO DB

        event.preventDefault();
        // check if user used geolocation
        if (useGeolocation) {

            // create array to be pass to the backend
            lostPet = {
                images,
                formData,
                finderLocation,
                useGeolocation: true
            };
            console.log(`all info passed back: ${JSON.stringify(lostPet)}`)
            sendFormDatatoLostPet(lostPet);
            // convert lat/long to zip code by passing into google maps
            $('#toggle-location').hide();

        } else if (!useGeolocation) {
            var inputZip = $('#inputZip').val().trim();
            finderLocation.push(inputZip);
            // create array to be pass to the backend
            lostPet = {
                images,
                formData,
                finderLocation,
                useGeolocation: false
            };
            console.log(`all info passed back: ${lostPet}`)
            sendFormDatatoLostPet(lostPet);
        }
    })
});

// pass all form data to the back /api/lostPet
function sendFormDatatoLostPet(lostPet) {

    console.log("in form test: " + JSON.stringify(lostPet));
    var route = '/api/addLostPet'
    $.ajax(route, {
        type: 'POST',
        data: lostPet
    }).then(function (response) {
        console.log(`POST: ${response}`);
    }).catch(function (err) {
        if (err) throw err;
    })
};

// when user presses geolocation
document.querySelector('#find-me').addEventListener('click', geoFindMe);