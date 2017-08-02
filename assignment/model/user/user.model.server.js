'use strict';
module.exports = function (mongoose) {
    const userSchema = require("./user.schema.server")(mongoose);
    const userModel = mongoose.model("UserModel", userSchema);

    //findUserByUsername("alice").then(console.log);

    const api = {
        "createUser": createUser,
        "findAllUsers": findAllUsers,
        "findUserByUsername": findUserByUsername,
        "findUserById": findUserById,
        "updateUser": updateUser
    };

    return api;

    function createUser(user) {
        return userModel.create(user, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
            }
        });
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
};