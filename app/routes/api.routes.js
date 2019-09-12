var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var Pets = require('../Models/pet');

// router.post('/api/users', function (req, res) {
//     User.create(req.body)
//     .then(function(resp) {
//         res.send('created')
//     })
//     .catch(function (err) {
//         throw err
//     })
// })

// router.get('/api/users', function (req, res) {
//     res.send('get all')
// })

// router.get('/api/users/:id', function (req, res) {
//     res.send('get one')
// })

// router.put('/api/users/:id', function (req, res) {
//     res.send('update')
// })

// router.delete('/api/users/:id', function (req, res) {
//     res.send('delete')
// })

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
    console.log("in  backend route" + formData);
    Pets.addLostPet(req.body, res);
});

router.get('/api/compare', function (req, res) {
    Pets.getPetsSimilarTo(req.body, res);
})
module.exports = router