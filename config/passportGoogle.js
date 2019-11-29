require('dotenv').config();
const passport = require('passport');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
var usersModel = require('../models/Users');
var usersMod = usersModel;

var mongoKey = process.env.MONGO_SECRET_OR_KEY;
const url = process.env.HOST + process.env.PORT;
const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy({
      clientID: googleId,
      clientSecret: googleSecret,
      callbackURL: url + '/auth/google/redirect'
    },
    function(accessToken, refreshToken, profile, cb) {
      var userEmail = profile.emails[0].value;
      var userPicture = profile.photos[0].value;
      var userPass = profile.id;
      usersMod.findOne({ email: userEmail }).then(user => {
        //Checks for existing user, if not it creates one
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
                //.then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        } 
        //If there is an user already it compares ID from both and updates it.
        else{
          // Check password
          bcrypt.compare(profile.id, user.password).then(isMatch => {
            if (!isMatch) {
              user.password = profile.id;
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
      cb(null, profile)
    }
  )
);
