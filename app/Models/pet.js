//dependencies
var knex = require("../db/knex");

var Pet = {
  getAllPets: function(cb) {
    knex
      .select()
      .from("pets")
      .then(function(res) {
        return cb.json(res);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  },
  selectAllOwnerPets: function(ownerId, cb) {
    knex
      .select()
      .from("pets")
      .where("owner_id", ownerId)
      .then(function(res) {
        return cb.json(res);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  }
};

module.exports = Pet;
