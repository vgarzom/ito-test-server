var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vet = require('../models/Vet');

/* GET ALL Events */
router.post('/login', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var username = req.body.username;
    var pass = req.body.password;

    if (typeof (username) === "undefined" || typeof (pass) === "undefined") {
        res.status(200).send({ code: 400, message: "Usuario o contraseña incorrecto" });
        return;
    }

    Vet.findOne({ username: username, password: pass }, function (err, vet) {
        if (err) return res.status(200).send({ code: 500, message: err });
        else res.status(200).send({ code: 200, message: "Bienvenido", vet: vet })
    });
});


router.post("/register", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var vet= new Vet(req.body);
    vet.save(function (err, gstation) {
        if (err) return res.status(200).send({ code: 500, message: err });
        else res.status(200).send({ code: 200, message: "Registro exitoso" });
    });
})

module.exports = router;