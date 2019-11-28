var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creates schema
var citySchema = new Schema({
    name: String,
    country: String,
    url: String
},{
    collection: 'cities'
});

//Creates model from schema
module.exports = new mongoose.model('cities', citySchema)