const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//---Models---
const usersModel = require('../models/Users');
const user = usersModel;

//---Environment data---
require('dotenv').config();
const host = process.env.HOST + process.env.CLIENT_PORT;
const mongoKey = process.env.MONGO_SECRET_OR_KEY;

require('../config/passportGoogle');


//-----------
//GOOGLE AUTH
//-----------
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/', session: false }),
  function (req, res) {
    var mongoKey = process.env.MONGO_SECRET_OR_KEY;
    user.findOne({ email: req.user._json.email }).then(user => {
      //Checks for existing user, if there is not, creates one
      if (!user) {
        const newUser = new usersMod({
          email: req.user._json.email,
          password: req.user._json.sub,
          urlPic: req.user._json.picture,
          likes: [],
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
                likes: newUser.likes,
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
            id: user._id,
            email: user.email,
            urlPic: user.urlPic,
            likes: user.likes,
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