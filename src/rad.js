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

    let d = new Date(year, month, day, 0, 0, 0, 0);

    let OneDayDataPromises = [];

    while (d.getDate() === day ) {

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


function filterArrayStep1(raw) {

    for (let i=0;i < raw.length; i++) {
        let tempData = [];
        for (let j=0;j < raw[i].length; j++) {
            tempData.push(raw[i][j].id);
        }
        if (i !=  raw.length-1){
            raw[i+1].indexes = tempData;
        }
    }
    return raw;

}


function filterArrayStep2(raw) {

    for (let i=0;i < raw.length; i++) {

        for (let j=0;j < raw[i].length; j++) {

            if (raw[i].hasOwnProperty('indexes')){

                raw[i].indexes.forEach( index => {
                    if (raw[i][j].id === index) {
                        raw[i].splice(j, 1);
                    }
                });

                delete raw[i].indexes;
            }
        }
    }
    return raw;

}



module.exports = {
    getRadDataPromise: getRadDataPromise,
    filterArrayStep1:filterArrayStep1,
    filterArrayStep2:filterArrayStep2
};