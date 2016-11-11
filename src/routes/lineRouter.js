'use strict';

const express = require('express');

var router = express.Router();


//Line Route
router.post('/', (req, res) => {

    res.json({router:"Test Route"});

});


module.exports = router;