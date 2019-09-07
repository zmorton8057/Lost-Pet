const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const knex = require('../app/db/knex');
const __ = require('lodash')
require('dotenv').config();
const keys = require('./config');


//passport serialize user function
passport.serializeUser((user, done) => {
    console.log('serialize user: ' + user.user_id);
    done(null, user.user_id)
});

//passport deserialize 
passport.deserializeUser((id, done) => {
    knex('users').where('user_id', id)
        .select()
        .then((resp) => {
            console.log('deserialize:' + JSON.stringify(resp))
            done(null, resp)
        })
});




passport.use(
    new GoogleStrategy({
        //Google strategy options 
        callbackURL: '/auth/google/redirect',
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //strategy callback 
        console.log('strategy started')
        console.log(profile)
        let data = __.pick(profile, 'displayName', 'id', 'name')
        console.log('data: ' + data)
        return new Promise((resolve, reject) => {
                knex('users').select()
                    .where('google_id', data.id)
                    .then((rows) => {
                        if (rows.length === 0) {
                            //if user doesn't exist make new user
                            console.log('its a new user so insert it')
                            knex('users').insert({
                                    username: data.displayName,
                                    google_id: data.id,
                                    user_id: data.name.familyName + Math.floor(Math.random() * 10000)
                                })
                                .then((resp) => {
                                    resolve(resp)
                                    console.log('user inserted')
                                })
                        } else {
                            //if it does exist 
                            console.log(rows[0])
                            console.log(`first done statement ran because user already exists`)
                            done(null, rows[0])
                        }
                    })
            }).then(() => {
                console.log(`data.id: ${data.id}`)
                var temp = knex('users').where('google_id', data.id).select()
                    .then(resp => {
                        console.log(`knex found: ${JSON.stringify(resp)}`)
                        return resp
                    })
                return temp
            }).then((temp) => {
                console.log('last done statement means that user was inserted or found in db', temp)
                done(null, temp[0])
            })
            .catch(err => {
                throw err
            })
    })
)