'use strict';
module.exports = function (mongoose) {
    const websiteSchema = require("./website.schema.server")(mongoose);
    const websiteModel = mongoose.model("WebsiteModel", websiteSchema);
};