// author - vn //

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
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        formData.push(longitude, latitude)
        console.log(formData)
        // submit button as an  id="submit-location"
        $('#submit-location').click(function (event) {
            var lostPet = {};
            event.preventDefault();
            console.log('i have all of the data: ' + formData)

            // for (var i = 0; i < formData.length; i++) {

            // // construct object from form data to be sent as validation and mysql query
            // lostPet = {
            //     pet_image1: formData[0],
            //     pet_image2: formData[1],
            //     pet_image3: formData[2],
            //     pet_type: formData[3],
            //     pet_breed: formData[4],
            //     color: formData[5],
            //     coat_type: formData[6],
            //     sex: formData[7],
            //     pet_size: formData[8],
            //     last_zip: formData[9],
            //     finder_name: formData[10],
            //     finder_phone: formData[11],
            //     finder_email: formData[12]
            // };

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
            sendFormDatatoLostPet(lostPet);
            // }
        })
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

}

// pass all form data to the back /api/lostPet
function sendFormDatatoLostPet(lostPet) {
    // POST request to add burger
    console.log("in form test: " + lostPet);
    var route = '/api/addLostPet'
    $.ajax(route, {
        type: 'POST',
        data: lostPet
    }).then((response) => {
        console.log(`POST: ${response}`)
    }).catch(function (err) {
        if (err) throw err;
    })
}


// when user presses geolocation
document.querySelector('#find-me').addEventListener('click', geoFindMe);