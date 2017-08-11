module.exports = (function() {
    'use strict';

    let express = require('express');
    let app = express();
    let path = require('path');
    let favicon = require('serve-favicon');
    let passport = require('passport');
    let cookieParser = require('cookie-parser');
    let session = require('express-session');

    let bodyParser = require('body-parser');

    app.use(cookieParser());
    app.use(session({
        secret: 'my secret', // TODO: change to env variable
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
    app.use(express.static(__dirname + '/public'));
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

    require("./testMongo/app.js")(app);

    require("./assignment/app")(app);

    require("./project/spoontacular.service.server")(app);

    require("./project/app")(app);

    let port = process.env.PORT || 3001;

    let server = app.listen(port);

    return server;
})();


