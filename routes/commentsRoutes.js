const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../models/Itinerary');
let itineraryMod = itineraryModel;

router.put("/comments/post/:userId/:itineraryId", cors(), (req, res) => {
  itineraryMod.findByIdAndUpdate(req.params.itineraryId,
    {$push: {comments: {user: req.body.commentUser, text: req.body.commentText, userId: req.params.userId}}}, {new: true},
  function(err){
    if(err){
      res.status(400).send('Error1');;
    }
  }
  )
})

router.put("/comments/delete/:userId/:itineraryId", cors(), (req, res) => {
  itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
    {$pull: {comments: {user: req.body.commentUser, text: req.body.commentText}}}, {new:true},
  function(err){
    if(err){
      res.status(400).send('Error2');;
    }
  }  
  )
})

router.put("/comments/edit/:userId/:itineraryId", cors(), (req, res) => {
  itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
    {$pull: {comments: {user: req.body.commentUser, text: req.body.commentText, userId: req.params.userId}}}, {new:true},
  function(err){
    if(err){
      res.status(400).send('Error2');;
    }
  }  
  )
})

module.exports = router;