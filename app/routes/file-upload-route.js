// 
var express = require('express');
var router = express.Router();
var awsS3 = require('../../config/config.aws')

AWS.config.update(
    {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
// -=-----
// S3_BUCKET = awsS3 exported here
const params = {
    Bucket: process.env.awsS3,
    Key: `avatar`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}`
}

s3.upload(params, (err, data) => {
    if (err) { return console.log(err) }

    // Continue if no error
    // Save data.Location in your database
    console.log('Image successfully uploaded.');
});