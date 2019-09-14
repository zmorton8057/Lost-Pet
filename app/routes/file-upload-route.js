// 
var express = require('express');
var router = express.Router();
var upload = require('../services/upload-file');

router.post('/api/upload', upload.single('image'), function (req, res) {
    console.log('-----here-----')
    console.log(req)

    console.log(req.file)
    return res.json({ url: req.file.location });
})


module.exports = router;