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
    usersMod.findOne({ email: req.user._json.email }).then(user => {
      //Checks for existing user, if there is not, creates one
      if (!user) {
        const newUser = new usersMod({
          email: req.user._json.email,
          password: req.user._json.sub,
          urlPic: req.user._json.picture,
          google: true
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(data => {
              const payload = {
                email: newUser.email,
                urlPic: newUser.urlPic,
                google: newUser.google
              }
              jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
                if (err) {
                  console.log(err)
                } else {
                  console.log(token)
                  res.redirect('http://localhost:3000/googleSign/' + token);
                }
              })
            })
          });
        });
      }
      //If there is an user already it compares ID from both and updates it.
      else {
        bcrypt.compare(req.user._json.sub, user.password).then(isMatch => {
          if (!isMatch) {
            user.password = req.user._json.sub;
          }
          const payload = {
            id: user.id,
            email: user.email,
            urlPic: user.urlPic,
            google: user.google
          };
          jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
            if (err) {
              console.log(err)
            } else {
              console.log(token)
              res.redirect('http://localhost:3000/googleSign/' + token);
            }
          });
        })
      }
    })    
  }
);

module.exports = router;