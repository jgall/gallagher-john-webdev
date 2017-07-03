// initialize custom logger.
var logger = console.log;
if (process.env.MLAB_USERNAME_WEBDEV) {
    var logger = function(){};
}

logger("Starting App...");

var express = require('express');
var app = express();
logger("Express acquired...");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
logger("Body Parser acquired...");

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
logger("Public Directory initialized...");

require ("./test/app.js")(app);
logger("Main app.js run...");

var port = process.env.PORT || 3000;

app.listen(port);
logger("Listening...");