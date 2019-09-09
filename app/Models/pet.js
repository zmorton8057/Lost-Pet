//dependencies
var knex = require("../db/knex");

var Pet = {
  getAllPets: function(cb) {
    knex
      .select()
      .from('pets')
      .then(function(res) {
        return cb.json(res);
      })
      .catch(function(err) {
        throw err;
      });
  }
};

module.exports = Pet;
