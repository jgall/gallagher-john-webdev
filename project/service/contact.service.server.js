'use strict';
module.exports = function (app) {

    let passport = require('passport');

    let userModel = require("../model/user/user.model.server.js");

    let auth = authorized;

    app.get('/api/project/getContacts', auth, getContacts);
    app.get('/api/project/incomingContactRequests', auth, getIncomingContactRequests);
    app.get('/api/project/outgoingContactRequests', auth, getOutgoingContactRequests);
    app.put('/api/project/requestContact/:username', auth, requestContact);
    app.delete('/api/project/removeIncomingContactRequest/:userId', auth, removeIncomingContactRequest);
    app.delete('/api/project/removeOutgoingContactRequest/:userId', auth, removeOutgoingContactRequest);
    app.delete('/api/project/contact/:userId', auth, deleteContact);



    function isAdmin(user) {
        return user.roles.indexOf("ADMIN") > 0;

    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function getContacts(req, res) {

        if(Array.isArray(req.user.contacts)) {

            Promise.all(req.user.contacts.map(userModel.findUserById)).then(contacts => contacts.map(c => ({
                _id: c._id,
                username: c.username,
                firstName: c.firstName,
                lastName: c.lastName,
            }))).then(contacts => {
                res.json(contacts);
                res.end();
            });
        } else {
            res.json([]);
            res.end();
        }

    }

    function getIncomingContactRequests(req, res) {
        Promise.all(req.user.incomingContactRequests.map(userModel.findUserById)).then(arr => arr.map(c => ({
            _id: c._id,
            username: c.username,
            firstName: c.firstName,
            lastName: c.lastName,
        }))).then(inc => {
            res.json(inc);
            res.end();
        })
    }

    function getOutgoingContactRequests(req, res) {
        Promise.all(req.user.outgoingContactRequests.map(userModel.findUserById)).then(arr => arr.map(c => ({
            username: c.username,
            _id: c._id,
        }))).then(inc => {
            res.json(inc);
            res.end();
        })
    }

    function requestContact(req, res) {
        console.log(req.params);
        userModel.findUserByUsername(req.params.username).then(user => {
            console.log(user);
            if (user.outgoingContactRequests.indexOf(req.user._id) >= 0) {
                return userModel.removeOutgoingContactRequest(user._id, req.user._id)
                    .then(() => userModel.addContact(user._id, req.user._id))
            } else {
                return userModel.addOutgoingContactRequest(req.user._id, req.params.username);
            }
        }).then(() => {
            res.status(200);
            res.end();
        })
    }

    function removeIncomingContactRequest(req, res) {
        userModel.removeIncomingContactRequest(req.user._id, req.params.userId).then(() => {
            res.json(200);
            res.end();
        })
    }

    function removeOutgoingContactRequest(req, res) {
        userModel.removeOutgoingContactRequest(req.user._id, req.params.userId).then(() => {
            res.json(200);
            res.end();
        })
    }

    function deleteContact(req, res) {
        userModel.removeContact(req.user._id, req.params.userId).then(() => {
            res.json(200);
            res.end();
        })
    }
};