var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../models/Contact');

/* GET ALL Events */
router.post('/login', function (req, res, next) {

    var username = req.body.username;
    var pass = req.body.password;

    if (typeof (username) === "undefined" || username === ""
        || typeof (pass) === "undefined" || pass === "") {
        res.status(200).send({ code: 400, message: "Usuario o contraseña incorrecto" });
        return;
    }

    Contact.find({ username: username, password: pass }, function (err, vet) {
        if (err) {
            return res.status(200).send({ code: 500, message: err });
        }
        else {
            console.log(vet);
            if (vet.length > 0) {
                res.status(200).send({ code: 200, message: "Bienvenido", contact: vet[0] })
            } else {
                res.status(200).send({ code: 400, message: "Usuario o contraseña incorrecto" })
            }
        }
    });
});


router.post("/register", function (req, res, next) {

    var contact = new Contact(req.body);
    contact.save(function (err, gstation) {
        if (err) return res.status(200).send({ code: 500, message: err });
        else res.status(200).send({ code: 200, message: "Registro exitoso" });
    });
})

module.exports = router;