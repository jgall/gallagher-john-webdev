'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const userSchema = require("./user.schema.server");
    const userModel = mongoose.model("ProjectUserModel", userSchema);

    const api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        getMongooseModel: getMongooseModel
    };

    return api;

    function createUser(user) {
        console.log("creating user: " + user);
        return userModel.create(user);
    }

    function findAllUsers() {
        return userModel.find()
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserById(id) {
        return userModel.findById(id);
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return userModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return userModel.remove({_id: userId});
    }

    function getMongooseModel() {
        return userModel;
    }

})();