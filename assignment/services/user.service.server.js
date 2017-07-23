/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    let apiName = "/api/user";
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
        let user = req.body;
        user._id = new Date().getTime();
        users.push(user);
        res.json(user);
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
        let user = users.find(u => u._id == req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404);
        }
        res.end();
    }

    function findUserByCredentials(req, res) {
        res.json(users.find(u => u.username == req.query.username && u.password == req.query.password));
        res.end();
    }

    function findUserByUsername(req, res) {
        res.json(users.find(u => u.username == req.query.username));
        res.end();
    }

    function updateUser(req, res) {
        let userId = req.params.userId;
        let userToUpdate = users.find(u => u._id == userId);
        users.splice(users.indexOf(userToUpdate), 1, req.body);
        res.status(200);
        res.end();
    }

    function deleteUser(req, res) {
        let userId = req.params.userId;
        let userToDelete = users.find(u => u._id == userId);
        users.splice(users.indexOf(userToDelete), 1);
        res.status(200);
        res.end();
    }
};
