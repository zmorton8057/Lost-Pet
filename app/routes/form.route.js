var express = require('express');
var router = express.Router();

// go to find page
router.get('/find', function (req, res) {
    res.render('find', {
        layout: 'default',
        template: 'home-template'
        //  pets 
    });
});

// table: lost_pet

module.exports = router;

