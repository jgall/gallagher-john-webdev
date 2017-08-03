'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const pageSchema = require("./page.schema.server")(mongoose);
})();