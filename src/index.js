'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const osmRouter  = require('./routes/osmRouter');
const radRouter  = require('./routes/radRouter');


let api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});



api.get("/", (req, res) => res.json({name: 'Map API'}));

//App routes
api.use('/osm', osmRouter);
api.use('/bikes', radRouter);


module.exports = api;
