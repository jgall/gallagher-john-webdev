'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const websiteSchema = require("./website.schema.server")(mongoose);
    const websiteModel = mongoose.model("WebsiteModel", websiteSchema);
})();