var express = require('express');
var router = express.Router();
const profileRoutes = require('./../routes/profile-routes');

// go to find page
router.get('/find', function (req, res) {
    res.render('find', {
        layout: 'find-layout',
        template: 'home-template'
    });
});


module.exports = router;

