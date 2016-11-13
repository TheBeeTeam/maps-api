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




function filterJson(raw) {
    let json = [];

    raw.markers.country.city.place.forEach((item)=>{
        if (item.hasOwnProperty ('bike_numbers')){
            let bikes = item['bike_numbers'].split(",");
            bikes.forEach((bikeId)=> {

                let bike = {};

                bike.id = bikeId;
                bike.coords = [item.lng,item.lat];

                json.push(bike);
            })

        }
    });
    return json;
}




function getPromise(path){

    return fetch(_buildURL(path))
        .then(res => res.text())
        .then(function(xml) {
            return new Promise(function(resolve, reject) {
                parser(xml, {mergeAttrs:true,explicitArray:false}, (err, json) => {
                    if (err) reject(`Error:${err}`);

                    resolve(filterJson(json));
                });
            })
        });
}


function getRadDataPromise(day,month,year) {

    let d = new Date(year, parseInt(month) - 1, parseInt(day));

    let OneDayDataPromises = [];

    while (d.getDate() === parseInt(day)) {

        let min = (d.getMinutes() === 0) ? '00' : d.getMinutes();
        let hour = ( d.getHours() < 10) ? `0${d.getHours()}` : d.getHours();
        let day = ( d.getDate() < 10) ? `0${d.getDate()}` : d.getDate();
        let month = ( d.getMonth() < 10) ? `0${d.getMonth()+1}` : d.getMonth()+1;


        //mg-2016-06-20T08:00:00+0200.xml
        let path = `mg-${d.getFullYear()}-${month}-${day}T${hour}:${min}:00+0200.xml`;

        OneDayDataPromises.push(getPromise(path));

        d.setMinutes(d.getMinutes()+30);
    }

    return Promise.all(OneDayDataPromises).then(values => {
            return values
    });

}




function filterArrayStep(raw) {

    let bikeTakenData = [];

    raw.forEach(function (element, myIndex, array) {
        if (myIndex === array.length-1) {
            bikeTakenData[array.length-1] = [];
            return;
        }

        bikeTakenData[myIndex] = [];

        element.forEach(function (place, myElementIndex) {

            var nextIterBikes = array[myIndex+1].filter(function(elem) {
                return elem.id === place.id;
            });

            if (!nextIterBikes.length) {
                bikeTakenData[myIndex].push(place);
            }
        });
    });

    return {raw:raw, filtered:bikeTakenData};

}



module.exports = {
    getRadDataPromise: getRadDataPromise,
    filterArrayStep:filterArrayStep
};