'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const lineRouter  = require('./routes/lineRouter');



let api = express();

api.use(bodyParser.urlencoded({extended: true}));


api.get("/", (req, res) => res.json({name: 'Map API'}));

//App routes
api.use('/lines', lineRouter);


module.exports = api;
