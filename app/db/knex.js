var environment = process.env.NODE_ENV || 'development'
var config = require('../../knexfile')[environment];
var knex = require('knex')(config);
knex.raw('SELECT 2+2')
.then(function(resp) {
    console.log('DB CONNECTED')
})
.catch(function(err) {
    console.error(err)
    throw err
})
module.exports = knex

