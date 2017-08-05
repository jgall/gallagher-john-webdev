/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    'use strict';

    const userDbApi = require("../model/user/user.model.server");

    const apiName = "/api/user";
    let users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post(apiName, createUser);
    app.get(apiName, handleGetQuery);
    app.get(apiName + "/:userId", handleGetParams);
    app.put(apiName + "/:userId", updateUser);
    app.delete(apiName + "/:userId", deleteUser);

    function createUser(req, res) {
        userDbApi.createUser(req.body).then(user => {
            res.json(user);
            res.end();
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function handleGetQuery(req, res) {
        let username = req.query.username;
        let password = req.query.password;

        if (password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        } else {
            res.status(404);
            res.end();
        }
    }

    function handleGetParams(req, res) {
        let userId = req.params.userId;

        if (userId) {
            findUserById(req, res);
        } else {
            res.status(404);
            res.end();
        }
    }

    function findUserById(req, res) {
        userDbApi.findUserById(req.params.userId).then((user) => {
            if (!!user) {
                res.json(user);
            } else {
                res.status(404);
            }
            res.end();
        }).catch(err => {
            res.status(404);
            res.end();
        });
    }

    function findUserByCredentials(req, res) {
        userDbApi.findUserByCredentials(req.query.username, req.query.password).then((user) => {
            res.json(user);
            res.end();
        });
    }

    function findUserByUsername(req, res) {
        userDbApi.findUserByUsername(req.query.username).then((user) => {
            res.json(user);
            res.end();
        });
    }

    function updateUser(req, res) {
        userDbApi.updateUser(req.params.userId, req.body).then(() => {
            res.status(200);
            res.end();
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function deleteUser(req, res) {
        userDbApi.removeUserById(req.params.userId).then(() => {
            res.status(200);
            res.end();
        });
    }
};
