require('dotenv').config()
const passport = require('passport');
const GoogleStrategy= require('passport-google-oauth20').Strategy;
//const User = mongoose.model("users");//modelo usuario REVISAR

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy({
    clientID: googleId,
    clientSecret: googleSecret,
    callbackURL: '/Auth/Google/Redirect'
    },
  function(accessToken, refreshToken, profile, cb){
    console.log(profile);
    cb(null,profile)
    }
  )
);
