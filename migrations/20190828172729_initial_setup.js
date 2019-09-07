
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email TINYTEXT NOT NULL
    );
  `)
};

exports.down = function(knex) {
  
};
