var bodyParser = require("body-parser");
var express    = require("express");
var app        = new express();

// create application/json parser
var jsonParser = bodyParser.json();
app.set("port", 3000);

app.use(express.static("app"));


app.post("/api/letters", jsonParser, function (req, res) {

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var chart = {};
    var max = Math.floor(Math.random() * (500- 50 + 1) + 50);

    chart.data = [
        {letter: "W", count: randomNumber(1, max)},
        {letter: "E", count: randomNumber(1, max)},
        {letter: "S", count: randomNumber(1, max)},
        {letter: "T", count: randomNumber(1, max)},
        {letter: "O", count: randomNumber(1, max)},
        {letter: "R", count: randomNumber(1, max)},
        {letter: "L", count: randomNumber(1, max)},
        {letter: "D", count: randomNumber(1, max)}
    ];
    res.send(chart);
});

app.use(function (req, res) {
    res.status(404);
    res.send("404 - Not Found");
});

app.use(function (err, req, res) {
    console.log(err.stack);
    res.send("500 - Error");
});

app.listen(app.get("port"), function () {
    console.log("Listening on port: " + app.get("port"));
});
