'use strict';

const express   = require('express');
const fs        = require('fs');
const path      = require('path');
const RAD       = require('./../rad');

var router = express.Router();


//Line Route
router.get('/month/:month/day/:day', (req, res) => {

    RAD.getRadDataPromise(req.params.day,req.params.month,2016).then((data) => {
        return res.json(data);
    }).catch((error) => {
        return res.json({error:error});
    })

});


//Line Route
router.get('/month/:month/day/:day/filtered', (req, res) => {

    let fileName =  `${req.params.day}-${req.params.month}-2016.json`;

    let filePath = path.join(__dirname,'./..','./..','./json',fileName);

    let fileContents;
    try {
        fileContents = fs.readFileSync(filePath);
        return res.json(JSON.parse(fileContents));

    } catch (err) {
        // Here you get the error when the file was not found,
        // but you also get any other error
        RAD.getRadDataPromise(req.params.day,req.params.month,2016).then((raw) => {


            let data = RAD.filterArrayStep(raw);

            fs.writeFile(filePath, JSON.stringify(data), (err) => {

                if(err) {
                    return console.log(err,fileName);
                }

                console.log(`The ${fileName} was saved!`);
            });


            return res.json(data);

        }).catch((error) => {
            return res.json(error);
        })

    }

});






module.exports = router;