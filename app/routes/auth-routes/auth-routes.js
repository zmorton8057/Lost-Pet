const router = require('express').Router();
const passport = require('passport');

// auth login 
router.get('/login', (req, res) => {
    res.render('login');
});

//auth log out 
router.get('/logout', (req, res) => {
    //handle with passport 
    req.logout(); 
    res.redirect('/')
}); 


//google auth 
router.get('/google', passport.authenticate('google', {
        scope: ['profile'],
        failureRedirect: '/'
    })
);

//google auth redirect 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user.username}); 
}); 

module.exports = router;