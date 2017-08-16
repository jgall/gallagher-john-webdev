'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        username: {type: String},
        password: {type: String},
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});
    return schema;
}());