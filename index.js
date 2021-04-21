const express = require("express");
const fs = require("fs");

const app = express();

//GET ARRESTS
//Endpoint for retrieving all arrests.
app.get('/listArrests', (req,res) => {
    fs.readFile(__dirname + "/" + "nypd-arrest-data-sample.json", "utf-8", (err,data) => {
        console.log(data);
        res.end(data);
    })
})

//GET BY ID
//Endpoint for retrieving an arrest by ARREST_KEY.
app.get('/:key', (req,res) => {
    fs.readFile(__dirname + "/" + "nypd-arrest-data-sample.json", "utf-8", (err,data) => {
        if(err) 
            console.log(err);
        else {
            var arrests = JSON.parse(data);
            var arrest = arrests.find(arr => {return arr.ARREST_KEY == req.params.key})
            res.end(JSON.stringify(arrest));
        }
    })
})

//GET BY RACE
//Endpoint for retrieving arrests based on race.
app.get('/byPerpRace/:race', (req,res) => {
    fs.readFile(__dirname + "/" + "nypd-arrest-data-sample.json", "utf-8", (err, data) => {
        if(err)
            console.log(err);
        else {
            var arrests = JSON.parse(data);
            var raceArrests = arrests.filter(arr => arr.PERP_RACE == req.params.race);
            res.end(JSON.stringify(raceArrests));
        }
    })
})

//Server setup.
var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening on http://%s:%s", host, port)
})