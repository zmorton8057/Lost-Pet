const keys = require('./config/config'); 
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      database: 'postgres',
      user: 'postgres',
      password: keys.dbPassword
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'postgres',
      password: keys.dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'postgres',
      password: keys.dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};