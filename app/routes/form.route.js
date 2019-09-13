var express = require('express');
var router = express.Router();
const profileRoutes = require('./../routes/profile-routes'); 

// go to find page
router.get('/', function (req, res) {
    res.render('find', {
        layout: 'find-layout',
        template: 'home-template', 
        user_name: profileRoutes.titleCase(req.user[0].username)
    });
});


module.exports = router;

