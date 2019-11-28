const router = require('express').Router();
const passport = require('passport');

//LOGIN
router.get('/Login', (req, res) => {
	res.send('Login page')
});

//LOGOUT
router.get('/Logout', (req, res) => {
	res.send('Login page')
});

//GOOGLE AUTH
router.get('/Google', 
    passport.authenticate('google', {scope:['email', 'profile']})
)

router.get('/Google/Redirect',
    passport.authenticate('google', {failureRedirect: '/Login', session:false}),
    function(req, res){
        res.redirect('/')
    }
)

module.exports = router;