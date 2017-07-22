/**
 * Created by jggll on 7/21/17.
 */
module.exports = function(app) {
    let apiName = "/api/user";
    let users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post(apiName, createUser);
    // TODO figure out whether the "/:userId" will make the following get only called when such a param exists
    app.get(apiName + "/:userId", handleGet);
    app.put(apiName + "/:userId", updateUser);

    function createUser(req, res) {
        let user = req.body;
        users.push(user);
        res.status(200);
    }

    function handleGet(req, res) {
        let username = req.query.username;
        let password = req.query.password;
        let userId = req.params.userId;

        if (userId) {
            findUserById(req, res);
        } else if (password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        } else {
            res.status(404);
        }
    }

    function findUserById(req, res) {
        let user = users.find(u => u._id == req.params.userId);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        res.json(users.find(u => u.username == req.query.username && u.password == req.query.password));
    }

    function findUserByUsername(req, res) {
        res.json(users.find(u => u.username == req.query.username));
    }

    function updateUser(req, res) {

    }
};
