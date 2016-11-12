'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const osmRouter  = require('./routes/osmRouter');
const radRouter  = require('./routes/radRouter');


let api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

api.get("/", (req, res) => res.json({name: 'Map API'}));

//App routes
api.use('/osm', osmRouter);
api.use('/bikes', radRouter);


module.exports = api;
