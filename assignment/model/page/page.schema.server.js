'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel", required: true},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
        dateCreated: {type: Date, default: Date.now}
    });
    return schema;
})();