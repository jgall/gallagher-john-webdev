'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        spoontacularId: Number,
        name: String,
        image: String,
        aisle: String,
    }, {collection: "ingredient"});
    return schema;
}());