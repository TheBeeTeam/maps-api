'use strict';

const express     = require('express');
const lineRouter  = require('./routes/lineRouter');



let api = express();

api.get("/", (req, res) => res.json({name: 'Map API'}));

//App routes
api.use('/lines', lineRouter);


module.exports = api;
