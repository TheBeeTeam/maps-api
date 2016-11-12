'use strict';

const express   = require('express');
const RAD       = require('./../rad');

var router = express.Router();


//Line Route
router.get('/', (req, res) => {

    RAD.getRadDataPromise('mg-2016-07-02T05%3a20%3a00%2b0200.xml').then((data) => {
        return res.json(data);
    })

});





module.exports = router;