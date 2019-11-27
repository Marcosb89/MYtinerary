//npm i passport-google-oauth20

const passport = require('passport');
const GoogleStrategy= require('passport-google-oauth20').Strategy;
const User = mongoose.model("users");//modelo usuario REVISAR

passport.use(new GoogleStrategy({
    clientI:'849258623369-lb3pierqear7tbqqcvuac8q3vjmg2g0b.apps.googleusercontent.com',
    clientSecret:'m7Vx8AQvuuQYnR9_hrHCd7wt',
    callbackURL:'http://localhost:3000/auth/google/callback'
},
  function(accessToken, refreshToken, profile, cb){
    console.log(profile);
    cb(null,profile)
  }));
