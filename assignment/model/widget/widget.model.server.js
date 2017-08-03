'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const widgetSchema = require("./widget.schema.server")(mongoose);
})();