var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vet = require('../models/Vet');

/* GET ALL Events */
router.post('/login', function (req, res, next) {

    var username = req.body.username;
    var pass = req.body.password;

    if (typeof (username) === "undefined" || username === ""
        || typeof (pass) === "undefined" || pass === "") {
        res.status(200).send({ code: 400, message: "Usuario o contraseña incorrecto" });
        return;
    }

    Vet.find({ username: username, password: pass }, function (err, vet) {
        if (err) {
            return res.status(200).send({ code: 500, message: err });
        }
        else {
            console.log(vet);
            if (vet.length > 0) {
                res.status(200).send({ code: 200, message: "Bienvenido", vet: vet[0] })
            } else {
                res.status(200).send({ code: 400, message: "Usuario o contraseña incorrecto" })
            }
        }
    });
});


router.post("/register", function (req, res, next) {
    var vet = new Vet(req.body);
    vet.save(function (err, gstation) {
        if (err) return res.status(200).send({ code: 500, message: err });
        else res.status(200).send({ code: 200, message: "Registro exitoso" });
    });
})
router.post("/close", function (req, res, next) {
    console.log("close body", JSON.stringify(req.body));
    Vet.aggregate([{
        '$geoNear': {
            'near': {
                'type': 'Point',
                'coordinates': [req.body.lng, req.body.lat]
            },
            spherical: true,
            maxDistance: req.body.max_distance,
            distanceField: "dist",
            distanceMultiplier: 0.001
        }
    }], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ code: 500, error: err });
        }
        res.json({ code: 200, vets: result });
    });
})



module.exports = router;