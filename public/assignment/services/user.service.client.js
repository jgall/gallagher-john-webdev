/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("UserService", UserService);

    function UserService() {
        let users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        let api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        function createUser(user) {
            users.push(user);
        }

        function findUserById(id) {
            return users.find(u => u._id == id);
        }

        function findUserByUsername(username) {
            return users.find(u => u.username == username);
        }

        function findUserByCredentials(username, password) {
            return users.find(u => u.username == username && u.password == password);
        }

        function updateUser(userId, user) {
            let userToUpdate = users.find(u => u._id == userId);
            users.splice(users.indexOf(userToUpdate), 1, user);
        }

        function deleteUser(userId) {
            let userToDelete = users.find(u => u.id == userId);
            users.splice(users.indexOf(userToDelete), 1);
        }
    }

})();