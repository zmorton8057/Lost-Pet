var express = require('express');
var router = express.Router();

// go to find page
router.get('/find', function (req, res) {
    res.render('find', {
        layout: 'default',
        template: 'home-template'
        // template: 'home-template',
        //  pets 
    });
});

module.exports = router;