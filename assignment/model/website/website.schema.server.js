'use strict';
module.exports = function (mongoose) {
    mongoose = require("mongoose");
    const schema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        dateCreated: {type: Date, default: Date.now}
    });
    return schema;
};