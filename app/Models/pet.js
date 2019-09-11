//dependencies
var knex = require("../db/knex");
var _ = require("lodash");
var axios = require("axios");

var Pet = {
  //returns all pets
  getAllPets: function(cb) {
    knex
      .select()
      .from("user_pets")
      .then(function(res) {
        return cb.json(res);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  //returns all pets linked to an owner
  selectAllOwnerPets: function(ownerId, cb) {
    knex
      .select()
      .from("user_pets")
      .where("owner_id", ownerId)
      .then(function(res) {
        return cb.json(res);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  //adds a new pet to DB
  addPet: function(petObj, cb) {
    knex("user_pets")
      .insert(petObj)
      .then(function(response) {
        console.log("Data Added to DB!" + response);
        cb.json("Pet Added");
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  //removes a pet
  removePet: function(petId, cb) {
    knex("user_pets")
      .where(pet_id, petId)
      .del()
      .then(function(res) {
        cb.send(res);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  addImageToPet: function(petInfo, cb) {
    var petId = _.pick(petInfo, "pet_id").pet_id;
    var file = _.pick(petInfo, "file");
    var image = {
      image: file.file
    };
    console.log(petId);

    //adds file to S3 and adds the link to the DB under the
    //pet's ID
    axios
      .post("/image-upload", image)
      .then(function(resp) {
        var imageLink = resp.imageUrl;

        //add the link to the pet entry
        knex("user_pets")
          .where("pet_id", petId)
          .update({
            pet_image1: imageLink
          })
          .then(function(res) {
            cb.send(res);
          })
          .catch(function(err) {
            if (err) throw err;
          });
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  getPetsSimilarTo: function(pet, cb) {
    //elements of pet to compare
    var petColor = pet.color;
    var petCoatType = pet.coat_type;
    var petSize = pet.pet_size;

    //grab all pets and compare in .then
    knex
      .select()
      .from("user_pets")
      .then(function(res) {
        //array of all pet Objs
        var allPetObjs = res;

        //will hold the objects with their points associtaed
        var pointsObjArray = {};

        //loop to add points
        for (var i = 0; i < allPetObjs.length; i++) {
          //points obj
          var petPointObj = {
            pet: allPetObjs[i],
            points: 0
          };

          if (allPetObjs[i].color === petColor) {
            petPointObj.points++;
          }
          if (allPetObjs[i].coat_type === petCoatType) {
            petPointObj.points++;
          }
          if (allPetObjs[i].color === petSize) {
            petPointObj.points++;
          }

          //add to Array
          pointsObjArray.push(petPointObj);
        } //end for

        //sort Array
        pointsObjArray.sort(function(pet1, pet2) {
          cb.send(pet1.points > pet2.points);
        });
      });
  }
};

module.exports = Pet;
