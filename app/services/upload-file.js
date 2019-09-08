//dependencies
const express = require('express');

//dependencies to upload to S3
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

//config keys
var keys = require('../../config/config');

//AWS configuration
aws.config.update({
    secretAccessKey: keys.AWSSecretKey,
    accessKeyId: keys.AWSAccessKey,
    region: 'us-west-1'
})

//new S3 instance
var s3 = new aws.S3()
 
//configure upload
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'middle-uci-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, 'Test')
    }
  })
})
 
module.exports = upload