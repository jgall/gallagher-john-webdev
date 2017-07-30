module.exports = (function() {
    'use strict';

    let express = require('express');
    let app = express();

    let bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
    app.use(express.static(__dirname + '/public'));

    require("./testMongo/app.js")(app);

    require("./assignment/app")(app);

    let port = process.env.PORT || 3001;

    let server = app.listen(port);

    return server;
})();


