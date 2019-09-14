const router = require('express').Router(); 
const knex = require('./../db/knex'); 

//check if logged in
const authCheck = (req, res, next) => {
//if not logged in
    if (!req.user) {
        res.redirect('/auth/google');
    } else {
        next(); 
    }; 
}; 

const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}; 

router.get('/', authCheck, (req, res) => {
    console.log(req.user)
    res.render('profile', {
        layout: 'profile-layout',
        template: 'home-template',
        user_name: titleCase(req.user[0].username), 
        user_image: req.user[0].user_image,
        user_location: 'Orange, Ca', 
        user_petsFound: 5, 
        user_bio: 'Sweet old Lady with 2 Golden Retreivers and one orange cat'
    });
}); 

router.get('/pets', (req, res) => {
    console.log(req.user);
    knex('user_pets').where('user_id', req.user[0].user_id).select('*')
    .then((result) => {
        console.log(result); 
        let userPets = result.map(x => x = {
            pet_name: titleCase(x.pet_name),
            pet_breed: x.pet_breed,
            color: x.color,
            lost_status: x.lost_status, 
            pet_coat: x.coat_type,
            pet_sex: x.sex, 
            pet_age: x.pet_age,
            pet_image1: x.pet_image1, 
            pet_image2: x.pet_image2, 
            pet_id: x.pet_id
        });
        return userPets
    }).then((result) => {
        res.render('user-pets', {
            layout: 'user-pets-layout',
            template: 'home-template',
            result, 
            user_name: titleCase(req.user[0].username)
        }); 
    }).catch(err => console.log(err)); 
}); 

router.get('/add', authCheck, (req, res) => {
    res.render('add-pet-form', {
        layout: 'add-pet-layout',
        template: 'home-template',
        user_name: titleCase(req.user[0].username)
    })
}); 

router.get('/matches', (req, res) => {
    knex('matches').where('user_id', req.user[0].user_id).select('*')
    .then((result) => {
        console.log(result); 
        let userPets = result.map(x => x = {
            pet_name: titleCase(x.pet_name),
            pet_breed: x.pet_breed,
            color: x.color,
            lost_status: x.lost_status, 
            pet_coat: x.coat_type,
            pet_sex: x.sex, 
            pet_age: x.pet_age,
            pet_image1: x.pet_image1, 
            pet_image2: x.pet_image2, 
            pet_id: x.pet_id
        });
        return userPets
    }).then((result) => {
    res.render('user-matches', {
        layout: 'user-pets-layout',
        template: 'home-template',
        result, 
        user_name: titleCase(req.user[0].username)
    });
    })
})

module.exports = { router, titleCase }   ; 