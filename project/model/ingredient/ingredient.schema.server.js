'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        spoontacularId: Number,
        name: String,
    }, {collection: "ingredient"});
    return schema;
}());