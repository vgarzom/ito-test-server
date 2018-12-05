var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ContactSchema = new mongoose.Schema({
    "name": String,
    "last_name": String,
    "age": Number,
    "sex": String,
    "zip_code": Number,
    "username": String,
    "password": String
});

module.exports = mongoose.model('Contact', ContactSchema, 'contacts');