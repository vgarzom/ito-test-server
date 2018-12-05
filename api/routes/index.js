console.log("loading routes")
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send("API is working")
});

// Load here the whole api routes
router.use("/contacts", require("./contacts"));
router.use("/vets", require("./vets"));


module.exports = router;