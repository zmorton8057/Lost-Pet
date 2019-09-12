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
  addLostPet: function (pet_info, cb) {
    knex("lost_pets")
      .insert(pet_info)
      .then(function (response) {
        console.log("Data Added to DB!" + response);
        cb.json("Pet Added");
      })
      .catch(function (err) {
        if (err) throw err;
      });
  }
};

module.exports = Pet;
