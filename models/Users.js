var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creates schema
var userSchema = new Schema({
    email: String,
    password: String,
    urlPic: String,
    likes: Array,
    google: Boolean
},
{
    collection: 'users'
});

//Creates model from schema
module.exports = new mongoose.model('users', userSchema)