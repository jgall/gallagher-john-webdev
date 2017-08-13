'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        writer: {type: mongoose.Schema.ObjectId, ref: "projectUser", require: true},
        meal: {type: mongoose.Schema.ObjectId, ref: "meal", require: true},
        text: {type: String, require: true},
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "comment"});
    return schema;
}());