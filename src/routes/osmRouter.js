'use strict';

const express   = require('express');
const OSM       = require('./../osm');

var router = express.Router();


//Line Route
router.get('/:entityType/:entityId', (req, res) => {

    return OSM.getOSMResourcePromise(req.params.entityType, req.params.entityId).then((data) => {
        return res.json(data);
    })

});





module.exports = router;