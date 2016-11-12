'use strict';

const URL           = require('url');
const fetch         = require('node-fetch');
const parser        = require('xml2js').parseString;


function _buildURL(_path) {

    return URL.format({
        protocol: 'https',
        host: 'data.robbi5.com',
        pathname: `/nextbike-mvgrad/${_path}`
    });
}


function getRadDataPromise(url) {

    return fetch(_buildURL(url))
        .then(res => res.text())
        .then(function(xml) {
                return new Promise(function(resolve, reject) {
                    parser(xml, {mergeAttrs:true,explicitArray:false}, (err, json) => {
                        if (err) reject(`Error:${err}`);
                        resolve(json);
                    });
                })
        });

}



module.exports = {
    getRadDataPromise: getRadDataPromise
};