'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const userSchema = require("./user.schema.server")(mongoose);
    const userModel = mongoose.model("UserModel", userSchema);

    const api = {
        "createUser": createUser,
        "findAllUsers": findAllUsers,
        "findUserByUsername": findUserByUsername,
        "findUserById": findUserById,
        "updateUser": updateUser,
        "removeUser": removeUser
    };

    return api;

    function createUser(user) {
        return userModel.create(user);
    }

    function findAllUsers() {
        return userModel.find()
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserById(id) {
        return userModel.findById(id);
    }

    function updateUser(userId, user) {
        return userModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return userModel.remove({_id: userId});
    }
})();