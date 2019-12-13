const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');

//Models
const usersModel = require('../models/Users');
const userMod = usersModel;

//Register new user
router.post('/register', (req, res) => {
  userMod.findOne({ email: req.body.email }).then(user => {
    if (userMod) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new userMod({
        email: req.body.email,
        password: req.body.password,
        urlPic: req.body.urlPic,
        likes: [],
        google: false
      });      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign({newUser}, mongoKey, { expiresIn: 31556926 }, (err, token) => {
                if(err) throw err;
                res.json({token, 
                  user:{
                    urlPic: user.urlPic,
                    email: user.email,
                    likes: user.likes,
                    google: user.google
                  }
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;