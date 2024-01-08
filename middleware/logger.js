const express = require("express");

const app = express();

// Logger middleware
app.use((req, res, next) => {
    // Print everything useful about the request to the console
    console.log(`+++++++++++++++++++++++++++++++`);
    console.log(`Request Time: ${new Date()}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
    console.log(`Request Query: ${JSON.stringify(req.query)}`);
    console.log(`Request IP: ${req.ip}`);
    console.log("+++++++++++++++++++++++++++++++");

    next();
});

module.exports = app;
