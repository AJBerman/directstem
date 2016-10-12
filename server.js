/**
 * Created by shay on 10/11/16.
 */

"use strict";

const express = require("express");
const app = new express();

app.set("port", process.env.port || 3000);

app.use(express.static("app"));
app.use(express.static("app/styles"));

app.use((req, res) => {
    res.status(404);
    res.send("404 - Not Found");
});

app.use((err, req, res) => {
    console.log(err.stack);
    res.send("500 - Error");
});


app.listen(app.get("port"), () => {
    console.log(`listening on port ${app.get("port")}`);
});
