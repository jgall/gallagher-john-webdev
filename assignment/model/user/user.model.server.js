'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const userSchema = require("./user.schema.server");
    const userModel = mongoose.model("UserModel", userSchema);
    let websiteModelApi = false;


    const api = {
        "createUser": createUser,
        "findAllUsers": findAllUsers,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials,
        "findUserById": findUserById,
        "updateUser": updateUser,
        "removeUserById": removeUserById,
        "addWebsiteToUser": addWebsiteToUser,
        "removeWebsiteFromUser": removeWebsiteFromUser
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

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserById(id) {
        return userModel.findById(id);
    }

    function updateUser(userId, user) {
        return userModel.update({_id: userId}, {$set: user});
    }

    function removeUserById(userId) {
        return findUserById(userId).then(user => {
                if (user.websites.length == 0) {
                    return userModel.remove({_id: userId});
                } else {
                    return getWebsiteModelApi().deleteWebsitesOfUser(userId)
                        .then(() => userModel.remove({_id: userId}));
                }
            }
        );
    }

    function addWebsiteToUser(userId, websiteId) {
        return userModel.update({_id: userId}, {$push: {websites: websiteId}});
    }

    function removeWebsiteFromUser(userId, websiteId) {
        return userModel.update({_id: userId}, {$pullAll: {websites: [websiteId]}});
    }
    
    function getWebsiteModelApi() {
        if (!websiteModelApi) {
            websiteModelApi = require("../website/website.model.server");
        }
        return websiteModelApi;
    }
})();