const dotenv = require('dotenv');
dotenv.config();
var awsS3 = {
    AWSAccessKey: process.env.AWSAccessKeyId,
    AWSSecretKey: process.env.AWSSecretKey
}

module.exports = awsS3;