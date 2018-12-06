var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var location = mongoose.Schema({
    type: {
        type: String,
        enum: ['Point', 'LineStrings', 'Polygons'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: 'una localización require de valores de longitud y latitud [lng, lat]'
    }
});

var ContactSchema = new mongoose.Schema({
    "name": String,
    "lastname": String,
    "age": Number,
    "sex": String,
    "zip_code": Number,
    "username": String,
    "password": String,
    "address": String,
    location: {
        type: location,
        required: 'Las coordenadas (location) son requeridas para localizar veterinarios cercanos'
    },
});

module.exports = mongoose.model('Contact', ContactSchema, 'contacts');