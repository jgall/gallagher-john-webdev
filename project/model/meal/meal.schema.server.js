'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        owner: {type: mongoose.Schema.ObjectId, ref: "projectUser", require: true},
        name: {type: String, required: true},
        description: String,
        comments: [{type: mongoose.Schema.ObjectId, ref: "comment"}],
        place: String,
        invited: [{type: mongoose.Schema.ObjectId, ref: "projectUser"}],
        accepted: [{type: mongoose.Schema.ObjectId, ref: "projectUser"}],
        viewableByLink: Boolean,
        recipe: {type: String},
        dateCreated: {type: Date, default: Date.now},
        date: {type: Date},
    }, {collection: "meal"});
    return schema;
}());