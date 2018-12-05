var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var VetSchema = new mongoose.Schema({
    "name": String,
    "last_name": String,
    "age": Number,
    "sex": String,
    "zip_code": Number,
    "profession": String,
    "username": String,
    "password": String
});

module.exports = mongoose.model('Vet', VetSchema, 'vets');