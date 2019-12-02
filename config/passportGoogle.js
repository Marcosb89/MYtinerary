const passport = require('passport');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
      cb(null, profile)
    }
  )
);
