var knex = require('../db/knex')
var users = {
    create(user) {
        return knex('users').insert(user)
    }
}

module.exports = users