const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);


//---Environment data---
require('dotenv').config();
const mongoKey = process.env.MONGO_SECRET_OR_KEY;


//Models
const usersModel = require('../models/Users');
const userMod = usersModel;

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  userMod.findOne({ email }).then(user => {
    // Check if user exists
    if (!userMod) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          email: user.email,
          urlPic: user.urlPic,
          likes: user.likes,
          google: user.google
        };
        jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
          res.json({
            token: token,
            id: payload.id,
            email: payload.email,
            urlPic: payload.urlPic,
            likes: payload.likes,
            google: payload.google
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;