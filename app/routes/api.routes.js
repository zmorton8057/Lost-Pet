var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var Pets = require('../Models/pet');
const __ = require('lodash');
const knex = require('./../db/knex');
const axios = require('axios');

//Route to get all pets
router.get('/api/allPets', function (req, res) {

    Pets.getAllPets(res);

});

router.get('/api/:ownerId', function (req, res) {

    var ownerId = req.params.ownerId;
    Pets.selectAllOwnerPets(ownerId, res);

});

router.post('/api/addPet', function (req, res) {
    if (req.body.pet_zip.length === 5 && req.body.pet_age.length <= 2) {
        req.body.pet_zip = Number(req.body.pet_zip)
        req.body.pet_age = Number(req.body.pet_age)
    } else {
        res.status(500).end
    }

    let insertObj = __.pick(req.body, 'pet_name', 'pet_type', 'pet_breed', 'color', 'pet_size', 'coat_type', 'sex', 'pet_age', 'pet_zip');

    // add pet is in the models
    knex('user_pets').insert(insertObj)
        .then((result) => {
            console.log(result)
        }).catch(err => console.log(err));
});

router.post('/api/addLostPet', function (req, res) {

    // ===================================
    // NEED TO ADD S3 TO CONVERT B64 BEFORE STORING TO DB

    // check for geolocation; convert coordinates to zip code
    if (req.body['useGeolocation']) {

        // get coordinates from incoming req.body
        var latitude = req.body['finderLocation'][0];
        var longitude = req.body['finderLocation'][1];

        // geocoder api
        var geocodeQueryUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBiG-tBK1gMuG9u2bPehR0_eYIVuaaWtMM`;

        // GET geocode
        axios.get(geocodeQueryUrl).then(function (response) {

            console.log(`\nGEORESPONSE: 
            ${JSON.stringify(response.data.results[0].address_components[7].short_name)}`);

            // replace coordinates with zip code string
            req.body.finderLocation = response.data.results[0].address_components[7].short_name;
            Pets.addLostPet(req.body, res);

        });
    } else {
        Pets.addLostPet(req.body, res);
    }
});

router.get('/api/compare', function (req, res) {
    Pets.getPetsSimilarTo(req.body, res);
});

module.exports = router;