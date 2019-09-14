const express = require('express');
const morgan = require('morgan');
const apiRoutes = require('./app/routes/api.routes');
// added pet route require to get newpet.js Eric Malvar
// const petRoute = require('./app/routes/petinfo.js')
const app = express();
const hbs = require('express-handlebars');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
const keys = require('./config/config');
const authRoutes = require('./app/routes/auth-routes/auth-routes');
const formRoutes = require('./app/routes/form.route.js')
const PORT = process.env.PORT || 3000;
const knex = require('./app/db/knex');
const shuffle = require('./app/public/js/shuffle');
const __ = require('lodash');
const profileRoutes = require('./app/routes/profile-routes');
var fileUpload = require('./app/routes/file-upload-route');

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}));

//use cookie encoder
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

//init passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'))
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./app/public"));
console.log(__dirname)
// Parse application body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.use('/auth', authRoutes);
app.use(apiRoutes);
app.use(fileUpload);
app.use('/profile', profileRoutes.router)

// use form routes
app.use(formRoutes);

//route to upload File to S3
// app.use(fileRoute);

app.get('/', (req, res) => {
    knex('user_pets').where('lost_status', true)
        .then((result) => {
            console.log(result)
            let pets = result.map(x => x = {
                pet_name: profileRoutes.titleCase(x.pet_name),
                pet_type: x.pet_type,
                pet_breed: x.pet_breed,
                color: x.color,
                lost_status: x.lost_status,
                pet_image1: x.pet_image1,
                pet_image2: x.pet_image2,
            });
            console.log(pets.pet_image1)
            return pets
        })
        .then((result) => {
            res.render('home', {
                layout: 'default',
                template: 'home-template',
                pets: result
            });
        }).catch(err => console.log(err));
});


app.listen(PORT, function () {
    console.log(`Listening on PORT: ${PORT}`)
})