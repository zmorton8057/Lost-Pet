const express = require('express');
const morgan = require('morgan');
const apiRoutes = require('./app/routes/api.routes');
const app = express();
const exphbs  = require('express-handlebars');
const passportSetup = require('./config/passport-setup'); 
const cookieSession = require('cookie-session'); 
const passport = require('passport');
require('dotenv').config();
const keys = require('./config/config');
const authRoutes = require('./app/routes/auth-routes'); 
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//use cookie encoder
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
})); 

//init passport 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(morgan('dev')); 
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./app/public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
}); 

app.use('/auth', authRoutes); 
app.use(apiRoutes); 

app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`); 
});