const express = require("express");
const router = express.Router();
const cors = require('cors');
let userModel = require('../models/Users');
let userMod = userModel;
let itineraryModel = require('../models/Itinerary');
let itineraryMod = itineraryModel;


router.get("/likes/:userId", cors(), (req, res) => {
  userMod
  .findById(req.params.userId)
  .then(data => {
    res.json(data.likes)
  })
  .catch(err => {
    console.log(err)
  });
})

router.put('/likes/postlike/:userId/:itineraryId',cors(), function(req,res){
    userMod.findById(req.params.userId)
        .then(data => {
            var i = data.likes.indexOf(req.params.itineraryId)
            if(i === -1) {
              userMod.findByIdAndUpdate(req.params.userId,
                {$push: {likes: req.params.itineraryId}},function(err){
                if(err){
                  res.status(400).send(/*err*/'Error1');
                }
              });
              
              itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
                {$inc: {rating: 1}}, function(err){
                if(err){
                  res.status(400).send('Error2');;
                }
              })

              res.status(200).send({message:"list updated"});

            } else {
              userMod.findByIdAndUpdate(req.params.userId, 
                {$pull: {likes: {$in: req.params.itineraryId}}}, function(err){
                if(err){
                  return res.status(400).send('Error3');
                }
              })
              itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
                {$inc: {rating: -1}}, function(err){
                if(err){
                  res.status(400).send('Error4');
                }
              })
              res.status(200).send({message:"item eliminado"})
            }
        })      
        .catch(e => {
          res.status(400).send(/*e*/'Error5');
        })
});


module.exports = router;