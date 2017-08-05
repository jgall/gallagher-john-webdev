'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        _page: {required: true, type: mongoose.Schema.ObjectId, ref: "PageModel"},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});
    return schema;
})();