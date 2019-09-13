var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var Pets = require('../Models/pet');

//Route to get all pets
router.get('/api/allPets', function (req, res) {
    Pets.getAllPets(res);
});

router.get('/api/:ownerId', function (req, res) {
    var ownerId = req.params.ownerId;

    Pets.selectAllOwnerPets(ownerId, res);
});

router.post('/api/addPet', function (req, res) {
    console.log(req.body);

    Pets.addPet(req.body, res);
})

router.post('/api/addLostPet', function (req, res) {
    var formData = req.body;
    Pets.addLostPet(req.body, res);
});

router.post('/api/compare', function (req, res) {
    Pets.getPetsSimilarTo(req.body, res);
})
module.exports = router