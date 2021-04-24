const express = require("express");
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const mongoUri = require('./../CONFIG/mongo-uri');

const uri = mongoUri.secretUri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

//GET ARRESTS
//Endpoint for retrieving all arrests.
//Returns the first 10 arrests.
app.get('/listArrests', (req,res) => {
    var output = ""
    client.connect(err => {
        const collection = client.db("arREST-DB").collection("ny-arrests");
        console.log("Collection connected successfully")
        collection.find().limit(10).toArray((err, arrests) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log("Arrests retrieved successfully");
                arrests.forEach((arrest) => {
                    output += JSON.stringify(arrest);
                })
                res.send(output);                
            }
        });      
    });

})

//GET BY ID
//Endpoint for retrieving an arrest by ARREST_KEY.
//Returns the arrest with the given :key param.
//TODO:
//  Could probably use a rewrite, using toArray for a single value result is kind of weird? Maybe findOne() or hasNext() to iter cursor.
app.get('/:key', (req,res) => {
    var output = ""
    client.connect(err => {
        const collection = client.db("arREST-DB").collection("ny-arrests");
        console.log("Collection connected successfully")
        collection.find({"ARREST_KEY": parseInt(req.params.key)}).toArray((err, arrest) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Query executed successfully")
                console.log(arrest);
                output += JSON.stringify(arrest[0])
                res.send(output);
            }
        })

    });      
  
})

//GET BY RACE
//Endpoint for retrieving arrests based on race.
//Returns stringified JSON.
app.get('/byPerpRace/:race', (req,res) => {

    var output = ""
    client.connect(err => {
        const collection = client.db("arREST-DB").collection("ny-arrests");
        console.log("Collection connected successfully")
        collection.find({"PERP_RACE":req.params.race}).toArray((err, arrests) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log("Arrests retrieved successfully");
                arrests.forEach((arrest) => {
                    output += JSON.stringify(arrest);
                })
                res.send(output);                
            }
        });      
    });
})

//Server setup.
var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening on http://%s:%s", host, port)
})

client.close(); 