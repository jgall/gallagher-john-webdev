'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./testMongo/app.js")(app);

require("./assignment/app")(app);

var port = process.env.PORT || 3001;

var server = app.listen(port);

module.exports = server;