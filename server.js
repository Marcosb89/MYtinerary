require('dotenv').config();
var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var cors = require('cors');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//Models
var citiesModel = require('./models/City');
var citiesMod = citiesModel;
var itineraryModel = require('./models/Itinerary');
var itineraryMod = itineraryModel;
var usersModel = require('./models/Users');
var usersMod = usersModel;
//Environment data
var port = process.env.PORT;
var mongodb = process.env.MONGO_URI;
var mongoKey = process.env.MONGO_SECRET_OR_KEY;

//Access to MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log('MongoDB connection succeeded.');
  } else console.log(err);
});

//----------
//MIDDLEWARE
//----------

app.use(cors());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(passport.initialize());
require('./config/passport')(passport);
const passportGoogle = require('./config/passportGoogle');
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
app.use('/', router);

//Logs requests beforehand
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

//------------
//GET REQUESTS
//------------
router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/cities', (req, res) => {
  citiesMod
    .find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/cities/:city_id', cors(), (req, res) => {
  itineraryMod
    .find({ id: req.params.city_id })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/createAccount', (req, res) => {
  res.send('CreateAccount page');
});

router.get('/mytinerary', (req, res) => {
  res.send('MYtinerary page');
});

//-------------
//POST REQUESTS
//-------------

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
      //STARTS BCRYPT	------------------------
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
      //ENDS BCRYPT---------------------------
    }
  });
});

router.post('/login', urlencodedParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  usersMod.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched - Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email,
          urlPic: user.urlPic
        };
        // Sign token
        jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
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

//-------------
//Port listener
//-------------
app.listen(port, () => console.log(`Listening on port ${port}`));
