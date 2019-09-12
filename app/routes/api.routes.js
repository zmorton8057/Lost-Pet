var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var Pets = require('../Models/pet');

//Route to get all pets
router.get('/api/allPets', function(req, res) {
    Pets.getAllPets(res);
});

router.get('/api/:ownerId', function(req, res) {
    var ownerId = req.params.ownerId;

    Pets.selectAllOwnerPets(ownerId, res);
});

router.post('/api/addPet', function(req, res) {
    console.log(req.body);

    Pets.addPet(req.body, res);
})

router.post('/api/addLostpet', function(req, res) {
    console.log(req.body);

    
})

router.post('/api/addImage', function(req, res) {
    Pets.addImageToPet(req, res);
})


module.exports = router