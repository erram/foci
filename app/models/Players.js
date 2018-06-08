// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var playerSchema = mongoose.Schema({
    ORSZÁG: String,
    POZICIO: String,
    NÉV: String,
    SZÜLETETT: String,
    VÁLOGATOTTSÁG: Number,
    GÓLOK: Number,
    CSAPAT: String,
    ÉRTÉK: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Player', playerSchema);