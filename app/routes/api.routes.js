var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var Pets = require('../Models/pet');
const __ = require('lodash'); 
const knex = require('./../db/knex'); 


//Route to get all pets
router.get('/api/allPets', function (req, res) {
    Pets.getAllPets(res);
});

router.get('/api/:ownerId', function (req, res) {
    var ownerId = req.params.ownerId;

    Pets.selectAllOwnerPets(ownerId, res);
});

router.post('/api/addPet', function (req, res) {
    console.log('req body' + JSON.stringify(req.body));
    console.log('--------------');
    if (req.body.pet_zip.length === 5 && req.body.pet_age.length <= 2) {
        req.body.pet_zip = Number(req.body.pet_zip)
        req.body.pet_age = Number(req.body.pet_age)
    } else {
        res.status(500).end
    }
    let insertObj = __.pick(req.body, 'pet_name', 'pet_type', 'pet_breed', 'color', 'pet_size', 'coat_type', 'sex', 'pet_age', 'pet_zip'); 
    console.log('insert obj: ' + JSON.stringify(insertObj)); 
    // add pet is in the models
    knex('user_pets').insert(insertObj)
        .then((result) => {
            console.log(result)
            
        }).catch(err => console.log(err)); 
});

router.post('/api/addLostPet', function (req, res) {
    var formData = req.body;
    console.log("in  backend route" + formData);
    Pets.addLostPet(req.body, res);
});

router.get('/api/compare', function (req, res) {
    Pets.getPetsSimilarTo(req.body, res);
}); 


module.exports = router