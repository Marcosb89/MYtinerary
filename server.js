var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var citiesModel = require('./City');
var citiesMod = citiesModel;
var itineraryModel = require('./Itinerary');
var itineraryMod = itineraryModel;
var usersModel = require('./Users');
var usersMod = usersModel;
var app = express();
var cors = require('cors');
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
const keys = require("./config/keys");
const jwt = require("jsonwebtoken");

//Access to MongoDB
mongoose.connect('mongodb+srv://Marcosb89:m&bM1989B89@mytinerarycluster-4ovxm.mongodb.net/MYtineraryDB?retryWrites=true&w=majority', 
{ useNewUrlParser: true }, (err) => {
	if (!err){
		console.log('MongoDB connection succeeded.')
	}else
		console.log(err)
});

//----------
//MIDDLEWARE
//----------
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(passport.initialize());
require("./config/passport");
app.use(cors());
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
	res.send("Home")
})

router.get('/Cities', (req, res) =>{
	citiesMod.find().then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err)
	});
	
})

router.get('/Cities/:city_id', cors(),(req, res) => {
	itineraryMod.find({"id": req.params.city_id})
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err)
	});
});

router.get('/CreateAccount', (req, res) => {
	res.send('CreateAccount page');
  });
  
  router.get('/Login', (req, res) => {
	res.send('Login page');
  });

router.get('/MYtinerary', (req, res) => {
  res.send('MYtinerary page');
});

//-------------
//POST REQUESTS
//-------------

router.post("/CreateAccount", urlencodedParser, (req, res) => {
	usersMod.findOne({email:req.body.email}).then(user=>{
		if (user) {
			return res.status(400).json({ email: "Email already exists" })
    } else {
				let newUser = new usersMod({
				email: req.body.email,
				password: req.body.password,
				urlPic: req.body.urlPic});
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
			};
	});
});	

router.post("/Login", urlencodedParser, (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	// Find user by email
  usersMod.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
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
				jwt.sign(payload,
					keys.secretOrKey, 
					{expiresIn: 31556926},
					(err, token) => {
          res.json({
						success: true, 
						token: "Bearer " + token});
					}
				);
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//-------------
//Port listener
//-------------
app.listen(port, () => console.log(`Listening on port ${port}`));