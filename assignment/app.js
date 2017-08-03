/**
 * Created by jggll on 7/21/17.
 */
'use strict';
module.exports = function (app) {

    let connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        let username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        let password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += process.env.MLAB_ACCESS_URL; // user yours
    }

    let mongoose = require("mongoose");
    mongoose.connect(connectionString);

    require("./model/model.server");

    require("./services/user.service.server")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
