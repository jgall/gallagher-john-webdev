/**
 * Created by jggll on 7/17/17.
 */
'use strict';
(function () {
    angular.module("MealPlanner").factory("UserService", UserService);

    function UserService($http) {
        let apiUrl = "/api/project";

        let api = {
            "login": login,
            "register": register,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "getContacts": getContacts
        };

        return api;

        // to test out async functions for fun.
        function login(username, password) {
            return $http.post(apiUrl + "/login", {username, password}).then(res => res.data);
        }

        function register(username, password) {
            return $http.post('/api/project/register', {username, password}).then(res => res.data);
        }

        function logout() {
            console.log("logging out");
            return $http.post('/api/project/logout').then(res => res.data);
        }

        function updateUser(userId, user) {
            return $http.put(apiUrl + "/user/" + userId, user);
        }

        function getContacts() {
            return $http.get(apiUrl + "/getContacts").then(res => res.data);
        }

        function deleteUser(userId) {
            return $http.delete(apiUrl + "/" + userId);
        }

        function checkLoggedIn() {
            return $http.get('/api/project/loggedin').then(res => res.data);
        }
    }

})();