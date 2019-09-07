const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  clientID: process.env.MY_CLIENT_ID,
  clientSecret: process.env.MY_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY, 
  dbPassword: process.env.DB_PASSWORD
};