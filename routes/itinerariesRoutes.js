const express = require('express');
const router = express.Router();
const cors = require('cors');


//Models
const itineraryModel = require('../models/Itinerary');
const itinerary = itineraryModel;

router.get('/cities/:cityId', cors(), (req, res) => {
  itinerary
    .find({ id: req.params.cityId })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
