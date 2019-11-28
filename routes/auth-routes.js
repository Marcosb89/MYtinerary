const router = require('express').Router();
const passport = require('passport');

//LOGIN
router.get('/login', (req, res) => {
	res.send('Login page')
});

//LOGOUT
router.get('/logout', (req, res) => {
	res.send('Logout page')
});

//GOOGLE AUTH
router.get('/google', 
    passport.authenticate('google', {scope:['email', 'profile']}))

router.get('/google/redirect',
    passport.authenticate('google', {failureRedirect: '/login', session:false}),
    function(req, res){
        res.redirect('/')
    }
)

module.exports = router;