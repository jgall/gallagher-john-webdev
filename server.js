module.exports = (function() {
    'use strict';

    let express = require('express');
    let app = express();
    let path = require('path');
    let favicon = require('serve-favicon');

    let bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
    app.use(express.static(__dirname + '/public'));
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

    require("./testMongo/app.js")(app);

    require("./assignment/app")(app);

    require("./project/poc.service.server")(app);

    let port = process.env.PORT || 3001;

    let server = app.listen(port);

    return server;
})();


