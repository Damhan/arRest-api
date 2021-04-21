const express = require("express");
const fs = require("fs");

const app = express();

app.get('/listArrests', (req,res) => {
    fs.readFile(__dirname + "/" + "nypd-arrest-data-sample.json", "utf-8", (err,data) => {
        console.log(data);
        res.end(data);
    })
})

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening on http://%s:%s", host, port)
})