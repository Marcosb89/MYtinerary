var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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
	citiesMod
	.find()
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		console.log(err)
	});
	
})

router.get('/Cities/:city_id', cors(),(req, res) => {
	itineraryMod
	.find({"id": req.params.city_id})
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
  usersMod;
	if(!req.body) return res.sendStatus(400);
	let account = new usersMod();
	account.userName = req.body.userName;
	account.email = req.body.email;
	account.password = req.body.password;
	account.urlPic = req.body.urlPic;

	account.save((err, accountStored) => {
		if(err) res.status(500).send({message: `Error posting to DB: ${err}`})
		res.status(200).send({account: accountStored})
	})

	//const {userName, email, password, urlPic} = req.body;
  //res.send(req.body);
	
});

router.post("/Login", urlencodedParser, (req, res) => {
  usersMod;
  if(!req.body) return res.sendStatus(400);
	const {userName, password} = req.body;
  res.send(req.body);
	
});

//-------------
//Port listener
//-------------
app.listen(port, () => console.log(`Listening on port ${port}`));