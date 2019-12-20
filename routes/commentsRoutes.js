const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../models/Itinerary');
let itineraryMod = itineraryModel;

router.get("/comments/:itId", cors(), (req, res) => {
  itineraryMod.findById(req.params.itId)
    .then(data => {
      res.status(200).json(data.comments)
    })
    .catch(err => {
      res.status(400).send(err)
    });
})

router.put("/comments/post/:userId/:itineraryId", cors(), (req, res) => {
  itineraryMod.findByIdAndUpdate(req.params.itineraryId,
    {$push: {comments: {user: req.body.commentUser, text: req.body.commentText, userId: req.params.userId}}})
  .then(response => {
    res.status(200).json(response.comments)
  })
})

router.put("/comments/delete/:userId/:itineraryId", cors(), (req, res) => {
  itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
    {$pull: {comments: {user: req.body.commentUser, text: req.body.commentText}}})
  .then(response => {
    res.status(200).json(response.comments)
  })
})

router.put("/comments/edit/:userId/:itineraryId", cors(), async(req, res) => {  
  await itineraryMod.findByIdAndUpdate(req.params.itineraryId, 
   {['comments.'+ req.body.commentIndex] : {user: req.body.commentUser, text: req.body.newCommentText, userId: req.params.userId}},{new:true})
  .then(response => {
    console.log(response.comments);

    res.status(200).json(response.comments)
  })
})

module.exports = router;