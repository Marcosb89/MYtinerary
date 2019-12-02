/*require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');

const host = process.env.HOST + process.env.PORT_CLIENT;

//LOGIN
router.get('/login', (req, res) => {
  res.send('Login page');
});

//LOGOUT
router.get('/logout', (req, res) => {
  res.send('Logout page');
});

//GOOGLE AUTH
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    
    res.redirect(host + '/');
  }
);

module.exports = router;*/
