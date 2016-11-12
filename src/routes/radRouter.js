'use strict';

const express   = require('express');
const RAD       = require('./../rad');

var router = express.Router();


//Line Route
router.get('/month/:month/day/:day', (req, res) => {

    RAD.getRadDataPromise(req.params.day,req.params.month,2016).then((data) => {
        return res.json(data);
    }).catch((error) => {
        return res.json({error:error});
    })

});


//Line Route
router.get('/month/:month/day/:day/filtered', (req, res) => {

    RAD.getRadDataPromise(req.params.day,req.params.month,2016).then((data) => {

        data = RAD.filterArrayStep1(data);
        data = RAD.filterArrayStep2(data);

        return res.json(data);
    }).catch((error) => {
        return res.json(error);
    })

});






module.exports = router;