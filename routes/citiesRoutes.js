const express = require('express');
const router = express.Router();
const cors = require('cors');

//Models
const citiesModel = require('../models/City');
const cities = citiesModel;


router.get('/cities', cors(), (req, res) => {
  cities
    .find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
