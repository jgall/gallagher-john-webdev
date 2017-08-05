'use strict';
module.exports = function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "website"});
    return schema;
}();