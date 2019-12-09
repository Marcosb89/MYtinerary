var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creates schema
var ItinerarySchema = new Schema({
    id: String,
    urlImg: String,
    user: String,
    title: String,
    profilePic: String,
    rating: Number,
    duration: Number,
    price: Number,
    hashtags: Array,
    activities: Array,
    comments: Array
},
{
    collection: 'itinerary'
});

//Creates model from schema
module.exports = new mongoose.model('Itinerary', ItinerarySchema)