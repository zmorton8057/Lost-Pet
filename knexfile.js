const keys = require('./config/config'); 
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'ec2-174-129-27-158.compute-1.amazonaws.com',
      database: 'dehrib8tjjdqh',
      user: 'lzvdgeunrsvdwy',
      password: keys.dbPassword,
      ssl: true
    }
  ,
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
      host : 'ec2-174-129-27-158.compute-1.amazonaws.com',
      database: 'dehrib8tjjdqh',
      user: 'lzvdgeunrsvdwy',
      password: keys.dbPassword,
      ssl: true
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
      host : 'ec2-174-129-27-158.compute-1.amazonaws.com',
      database: 'dehrib8tjjdqh',
      user: 'lzvdgeunrsvdwy',
      password: keys.dbPassword,
      ssl: true
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