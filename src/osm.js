'use strict';

const URL           = require('url');
const fetch         = require('node-fetch');
const parser        = require('xml2js').parseString;


function _buildURL(entityType,entityId) {
    return URL.format({
        protocol: 'http',
        host: 'api.openstreetmap.org',
        pathname: `/api/0.6/${entityType}/${entityId}`
    });
}


function getOSMResourcePromise(entityType, entityId) {


    return fetch(_buildURL(entityType, entityId))
        .then(res => res.text())
        .then(function (xml) {
            return new Promise(function (resolve, reject) {
                parser(xml, {mergeAttrs: true, explicitArray: false}, (err, json) => {
                    if (err) reject(`Error:${err}`);
                    resolve(json);
                });
            })
        });

}

module.exports = {
    getOSMResourcePromise: getOSMResourcePromise
};


