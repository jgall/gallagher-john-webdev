/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("UserService", UserService);

    function UserService($http) {
        let apiUrl = "/api/user";

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
            return $http.post(apiUrl, user);
        }

        function findUserById(id) {
            return $http.get(apiUrl + "/" + id).then(res => res.data);
        }

        function findUserByUsername(username) {
            return $http.get(apiUrl + "/?username=" + username).then(res => res.data);
        }

        function findUserByCredentials(username, password) {
            return $http.get(apiUrl + "/?username=" + username + "&password=" + password).then(res => res.data);
        }

        function updateUser(userId, user) {
            return $http.put(apiUrl + "/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete(apiUrl + "/" + userId);
        }
    }

})();