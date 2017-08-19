'use strict';
module.exports = (function () {

    const bcrypt = require('bcrypt-nodejs');

    console.log(bcrypt.hashSync("alice"));

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
        getMongooseModel: getMongooseModel,
        addIngredient: addIngredient,
        removeIngredient: removeIngredient,
        addOutgoingContactRequest: addOutgoingContactRequest,
        removeOutgoingContactRequest: removeOutgoingContactRequest,
        removeIncomingContactRequest: removeIncomingContactRequest,
        removeContact: removeContact,
        addContact: addContact,

    };

    return api;

    function createUser(user) {
        user.password = bcrypt.hashSync(user.password);
        return userModel.create(user);
    }

    function findAllUsers() {
        return userModel.find()
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userModel
            .findOne({username: username})
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return user;
                } else {
                    null;
                }
            });
    }

    function findUserById(id) {
        return userModel.findById(id);
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
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

    function addIngredient(userId, ingredientId) {
        return userModel.update({_id: userId}, {$push: {ingredientStash: ingredientId}});
    }

    function removeIngredient(userId, ingredientId) {
        return userModel.update({_id: userId}, {$pull: {ingredientStash: ingredientId}});
    }

    function addOutgoingContactRequest(userId, contactUsername) {
        return findUserByUsername(contactUsername).then(c =>
            userModel.update({_id: userId}, {$push: {outgoingContactRequests: c._id}})
                .then(() => userModel.update({_id: c._id}, {$push: {incomingContactRequests: userId}})));
    }

    function removeOutgoingContactRequest(userId1, userId2) {
        return userModel.update({_id: userId1}, {$pull: {outgoingContactRequests: userId2}})
            .then(() =>
                userModel.update({_id: userId2}, {$pull: {incomingContactRequests: userId1}}));
    }

    function removeIncomingContactRequest(userId1, userId2) {
        return userModel.update({_id: userId1}, {$pull: {incomingContactRequests: userId2}})
            .then(() =>
                userModel.update({_id: userId2}, {$pull: {outgoingContactRequests: userId1}}));
    }

    function removeContact(userId1, userId2) {
        return userModel.update({_id: userId1}, {$pull: {contacts: userId2}})
            .then(() => userModel.update({_id: userId2}, {$pull: {contacts: userId1}}));
    }

    function addContact(userId1, userId2) {
        return userModel.update({_id: userId1}, {$push: {contacts: userId2}})
            .then(() => userModel.update({_id: userId2}, {$push: {contacts: userId1}}));
    }

})();