// this file will be used to grab user input to make a pet in the database or to get pet info based on routes see below
// Created by Eric Malvar please ask if any questions
var express = require('express')
var router = express.Router()
var User = require('../resources/users');
var knex = require('../../app/db/knex')
// used to get information about all pets if needed
// this route will list ALL pets in DB as JSON, as it fills up we can limit search if needed
router.get('/allpets', function (req, res) {
        knex.select('*').from('user_pets')
        .then(function(response){
         console.log(response)
         res.json(response);
        })
})
// currently set as a get for testing: will change upon adding of front end input -Eric Malvar
// this route will be used for adding a new pet under the users id or however we want to uniquely identify them
// values will be updated with front end input, please feel free to change route as well
// my reasoning for not having a pet parameter is that the unique pet ID will be created AFTER the pet is added to the database
// this step will be done be postgre so we don't yet have a unique ID for the pet
router.get('/:userID/newPet',function(req,res){
     var userID = req.params.userID;

    var pet = {
        pet_image1: '_blank',
        pet_name : 'Billy',
        pet_type : 'Dog',
        pet_breed : 'Retriever',
        color : 'Brown',    
         coat_type : "Silky",
        coat_length : "sLong Hair",
        sex  : "Female",
        pet_age : 8,
        pet_size : "M",
        lost_status : true,
        lost_date :"9-02-19",
        pet_zip:91374,
        owner_id : 12345
        }
        knex('user_pets').insert(pet)
        .then(function(response){
            console.log('Data Added to DB!'+ response)
            res.json('Pet Added')
        })
})
// this route can be used to get data about a specific pet searchable by pet name OR pet_id (checks number vs string)-Eric M
router.get('/allpets/:petName',function(req,res){
    var petName = req.params.petName;

    if (isNaN(Number(petName))){
    knex.select('*').from('user_pets')
    .where({
        pet_name: petName
    }).then(function(response){
        res.json(response)
    });
}else {
    knex.select('*').from('user_pets')
    .where({
        pet_id: petName
    }).then(function(response){
        res.json(response)
    })
}
})
// This route can be used to find lost pets based on your zip code
// the second route will find all lost pets
router.get('/lostpets/:zip',function(req,res){
    var zip = req.params.zip
    knex.select('*').from('user_pets')
    .where({
        lost_status: true,
        pet_zip:zip
    }).then(function(response){
        res.json(response)
    })
})
router.get('/lostpets',function(req,res){
    knex.select('*').from('user_pets')
    .where({
        lost_status: true
    }).then(function(response){
        res.json(response)
    })
})

module.exports = router;