'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        username: {type: String, unique: true},
        password: {type: String},
        firstName: String,
        lastName: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        dateOfBirth: Date,
        email: {type: String},
        phone: String,
        roles: [{type: String}],
        ingredientStash: [{type: mongoose.Schema.ObjectId, ref: "ingredient"}],
        contacts: [{type: mongoose.Schema.ObjectId, ref: "projectUser"}],
        contactRequests: [{type: mongoose.Schema.ObjectId, ref: "projectUser"}],
        recipes: [{type: String}],
        meals: [{type: mongoose.Schema.ObjectId, ref: "meal"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "projectUser"});
    return schema;
}());