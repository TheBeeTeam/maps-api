'use strict';

const http      = require('http');
const parser    = require('xml2js').parseString;



function getOSMResourcePromise(entityType, entityId) {

    return new Promise(function(resolve, reject) {

        let options = {
            host: 'api.openstreetmap.org',
            port: 80,
            path: '/api/0.6/' + entityType + '/' + entityId
        };


        http.get(options, (resp) => {
            resp
                .on('data',(data) => {

                    parser(data.toString('utf8'), (err, json) => {
                        return resolve(json);
                    });

                })

                .on("error", (error) => reject ({message: "Got error: " + error.message}));
        });

    })
}

module.exports = {
    getOSMResourcePromise: getOSMResourcePromise
};


