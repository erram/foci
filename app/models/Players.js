// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var playerSchema = mongoose.Schema({
    country: String,
    position: String,
    name: String,
    born: String,
    selected: Number,
    goals: Number,
    team: String,
    point: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Player', playerSchema);