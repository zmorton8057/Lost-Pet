//dependencies
var knex = require("../db/knex");

var Pet = {
  getAllPets: function (cb) {
    knex
      .select()
      .from("user_pets")
      .then(function (res) {
        return cb.json(res);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  },
  selectAllOwnerPets: function (ownerId, cb) {
    knex
      .select()
      .from("user_pets")
      .where("owner_id", ownerId)
      .then(function (res) {
        return cb.json(res);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  },
  addPet: function (petObj, cb) {
    knex("user_pets")
      .insert(petObj)
      .then(function (response) {
        console.log("Data Added to DB!" + response);
        cb.json("Pet Added");
      })
      .catch(function (err) {
        if (err) throw err;
      });
  },
  removePet: function (petId, cb) {
    knex("user_pets")
      .where(pet_id, petId)
      .del()
      .then(function (res) {
        cb.send(res);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  },
  addLostPet: function (petArrays, cb) {
    console.log(petArrays)
    //info pulled from the req
    var images = petArrays["images"];
    var formData = petArrays['formData'];
    var finderLocation = petArrays['finderLocation'];
    console.log(images, formData, finderLocation);
    //obj to be send to the back
    var finalObj = {
      pet_image1: "",
      pet_image2: "",
      pet_image3: "",
      pet_type: "",
      pet_breed: "",
      color: "",
      pet_size: "",
      coat_type: "",
      sex: "",
      finder_name: "",
      finder_phone: "",
      finder_email: "",
      last_zip: ""
    };

    //obj keys array
    var keys = Object.keys(finalObj);

    //fills the obj with info passed in
    for (var i = 0; i < 3; i++) {
      finalObj[keys[i]] = images[i];
    }

    for (var i = 3; i < keys.length; i++) {
      finalObj[keys[i]] = formData[i - 3];
    }

    //add lost pet to Lost_pet
    knex("lost_pets")
      .insert(finalObj)
      .then(function (resp) {
        console.log("Data Added to DB!" + resp);
        cb.send(resp);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  },

  getPetsSimilarTo: function (pet, cb) {
    //elements of pet to compare
    var petColor = pet.color;
    var petCoatType = pet.coat_type;
    var petSize = pet.pet_size;
    var petZip = pet.pet_zip
    //grab all pets and compare in .then
    knex
      .select()
      .from("user_pets")
      .then(function (res) {
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
          if (petPointObj.points === 3 && allPetObjs[i].pet_zip === petZip) {
            petPointObj.points++;
          }
          //add to Array
          pointsObjArray.push(petPointObj);
        } //end for
        //sort Array
        pointsObjArray.sort(function (pet1, pet2) {
          cb.send(pet1.points > pet2.points);
        });
      });
  }
};

module.exports = Pet;
