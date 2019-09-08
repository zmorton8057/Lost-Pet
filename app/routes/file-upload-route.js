var express = require('express');
var router = express.Router();

var upload = require('../services/upload-file');

var sinlgeUpload = upload.single('image');

router.post('/image-upload', function(req, res) {
    sinlgeUpload(req, res, function(err) {
        return res.json({'imageUrl': req.file.location})
    })
})

module.exports = router;