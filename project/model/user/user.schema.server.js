'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const schema = mongoose.Schema({
        username: {type: String, unique: true, require: true},
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
        email: {type: String, require: true},
        phone: String,
        roles: [{type: String}],
        ingredientStash: [{type: mongoose.Schema.ObjectId, ref: "ingredient"}],
        contacts: [{type: mongoose.Schema.ObjectId, ref: "userv2"}],
        incomingContactRequests: [{type: mongoose.Schema.ObjectId, ref: "userv2"}],
        outgoingContactRequests: [{type: mongoose.Schema.ObjectId, ref: "userv2"}],
        recipes: [{type: String}],
        meals: [{type: mongoose.Schema.ObjectId, ref: "meal"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "userv2"});
    return schema;
}());