const router = require('express').Router();
const passport = require('passport');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//---Models---
var usersModel = require('../models/Users');
var usersMod = usersModel;
//---Environment data---
require('dotenv').config();
const host = process.env.HOST + process.env.CLIENT_PORT;

//---------
//--LOGIN--
//---------
router.get('/login', (req, res) => {
  res.send('Login page');
});

//----------
//--LOGOUT--
//----------
router.get('/logout', (req, res) => {
  res.send('Logout page');
});

//-----------
//GOOGLE AUTH
//-----------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    var mongoKey = process.env.MONGO_SECRET_OR_KEY;
    var userEmail = req.user._json.email;
    var userPicture = req.user._json.picture;
    var userPass = req.user._json.sub;
    usersMod.findOne({ email: userEmail }).then(user => {
      //Checks for existing user, if there is not, creates one
      if (!user) {
        let newUser = new usersMod({
          email: userEmail,
          password: userPass,
          urlPic: userPicture
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .catch(err => console.log(err));
          });
        });
      }
      //If there is an user already it compares ID from both and updates it.
      else {
        // Check password
        bcrypt.compare(req.user._json.sub, user.password).then(isMatch => {
          if (!isMatch) {
            user.password = req.user._json.sub;
          }
          //Create JWT Payload
          const payload = {
            id: user.id,
            email: user.email,
            urlPic: user.urlPic
          };
          // Sign token
          jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
            console.log(({
              success: true,
              token: 'Bearer ' + token
            }));
          });
        })
      }
    })    
    res.redirect(host + '/');
  }
);

module.exports = router;