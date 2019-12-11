var express = require('express');
var app = express();

var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//---Models---
var citiesModel = require('./models/City');
var citiesMod = citiesModel;
var itineraryModel = require('./models/Itinerary');
var itineraryMod = itineraryModel;
var usersModel = require('./models/Users');
var usersMod = usersModel;
//---Environment data---
require('dotenv').config();
var port = process.env.PORT;
var mongodb = process.env.MONGO_URI;
var mongoKey = process.env.MONGO_SECRET_OR_KEY;

//Access to MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err) {
    console.log('MongoDB connection succeeded.');
  } else console.log(err);
});

//----------
//MIDDLEWARE
//----------

app.use(express.json())
app.use(cors());
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
router.post('/protected', verifyToken, (req, res) => {
  jwt.verify(req.token, mongoKey, ( err, authData) =>{
    if(err){
      res.sendStatus(403);
    }
    else{
      res.json({
        message: 'Success',
        authDAta
      })
    }
  })
})

router.post('/users', (req, res) => {
  usersMod.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new usersMod({
        email: req.body.email,
        password: req.body.password,
        urlPic: req.body.urlPic,
        isLogged: true,
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
                    id: user.id,
                    urlPic: user.urlPic,
                    email: user.email,
                    isLogged: user.isLogged,
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

router.post('/users/login', (req, res) => {
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
        const payload = {
          email: user.email,
          urlPic: user.urlPic,
          likes: user.likes,
          google: user.google
        };
        jwt.sign(payload, mongoKey, { expiresIn: 31556926 }, (err, token) => {
          res.json({
            token: token,
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

router.post('/users/login/like', (req, res) => {
  db.usersMod.save
})

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//VERIFY TOKEN
function verifyToken(req, res, next){
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

//-------------
//Port listener
//-------------
app.listen(port, () => console.log(`Listening on port ${port}`));