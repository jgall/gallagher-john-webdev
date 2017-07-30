/**
 * Created by jggll on 7/21/17.
 */
module.exports = function(app) {
    'use strict';

    require("./services/user.service.server")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
