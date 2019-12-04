router.post('/createAccount', urlencodedParser, (req, res) => {
  usersMod.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      let newUser = new usersMod({
        email: req.body.email,
        password: req.body.password,
        urlPic: req.body.urlPic
      });
      jwt.sign(newUser, mongoKey, { expiresIn: 31556926 }, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      });
      localStorage.setItem('Bearer', token)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(res.redirect('/'))
            .catch(err => console.log(err));
        });
      });
    }
  });
});