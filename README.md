# Lost-Pet (Express, Node, Postgres, Handlebars)
Create a profile and register your pets! Toggle status to lost if your pet is missing. When someone reports a lost pet, if there is a match, the pet owner will be notified!

Demo: https://powerful-depths-35376.herokuapp.com/

# Application
### Create a profile by logging into Google. (Passport)
![](.app/public/images/lost-pet-intro.gif)

### Add or report a pet by uploading photos (Amazon AWS S3) and creating a profile.
![](.app//public/images/lost-pet-upload.gif)

### Use geolocation to pinpoint lost pet location. (Geocoder)
![](.app/public/images/lost-pet-geo.gif)

# Configuration
- Install NPM packages
- Create `.env ` for your keys.
- Setup and configure AWS S3 account:
- AWS config in `upload-file.js`
```javascript
//AWS configuration
aws.config.update({
  secretAccessKey: keys.AWSSecretKey,
  accessKeyId: keys.AWSAccessKey,
  region: '<AWS region>'
})
```
- Setup Google ClientID and ClientSecret for Google Oauth in `config.js`
```javascript
  clientID: process.env.MY_CLIENT_ID,
  clientSecret: process.env.MY_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY, 
  dbPassword: process.env.DB_PASSWORD,
```

- Start application with: `npm start`

# Technologies:
- Express.js
- Node.js
- PostgresSQL
- Handlebars.js
- Amazon AWS S3
- Geolocation API
- Passport Google Oauth

