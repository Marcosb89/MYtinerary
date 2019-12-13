const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
const cors = require('cors');
app.use(cors());

//---Environment data---
require('dotenv').config();
const port = process.env.PORT;
const mongodb = process.env.MONGO_URI;

//Routes Path---const Routes = require('./routes/Routes');
const router = express.Router();
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const googleRoutes = require('./routes/googleRoutes');
const citiesRoutes = require('./routes/citiesRoutes');
const itinerariesRoutes = require('./routes/itinerariesRoutes');
//const activitiesRoutes = require('./routes/activitiesRoutes');
const likesRoutes = require('./routes/likesRoutes');
//const commentsRoutes = require('./routes/commentsRoutes');

//Access to MongoDB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (!err) {
    console.log('MongoDB connection succeeded.');
  } else console.log(err);
});

//Logs requests beforehand
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

//Routes
app.use('/', router);
app.use('/users', registerRoutes);
app.use('/users', loginRoutes);
app.use('/api', googleRoutes);
app.use('/', citiesRoutes);
app.use('/', itinerariesRoutes);
//app.use('/', activitiesRoutes);
app.use('/users', likesRoutes);
//app.use('/', commentsRoutes);


app.listen(port, () => console.log(`Listening on port ${port}`));