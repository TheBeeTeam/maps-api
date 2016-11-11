'use strict';

const express   = require('express');
const http      = require('http');
const parser    = require('xml2json');

var router = express.Router();


//Line Route
router.get('/', (req, res) => {

    let options = {
        host: 'api.openstreetmap.org',
        port: 80,
        path: '/api/0.6/node/140485768'
    };

    http.get(options, (resp) => {

        resp
            .on('data', function(data){

                // xml to json
                var json = parser.toJson(data.toString('utf8'));
                res.json(json);

                });
            })
            .on("error", function(e){

                res.json({message: "Got error: " + e.message});

            });

});


module.exports = router;