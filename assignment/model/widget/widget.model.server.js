'use strict';
module.exports = function (mongoose) {
    const widgetSchema = require("./widget.schema.server")(mongoose);
};