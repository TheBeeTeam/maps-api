'use strict';

const express   = require('express');
const RAD       = require('./../rad');

var router = express.Router();


//Line Route
router.get('/', (req, res) => {

    RAD.getRadDataPromise(27,6,2016).then((data) => {
        return res.json(data);
    })

});


//Line Route
router.get('/filtered', (req, res) => {

    RAD.getRadDataPromise(27,6,2016).then((data) => {

        data = RAD.filterArrayStep1(data);
        data = RAD.filterArrayStep2(data);

        return res.json(data);
    })

});






module.exports = router;