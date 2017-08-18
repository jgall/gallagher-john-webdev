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
            "getContacts": getContacts,
            "getIncomingContactRequests": getIncomingContactRequests,
            "getOutgoingContactRequests": getOutgoingContactRequests,
            "requestContact": requestContact,
            "removeIncomingContactRequest": removeIncomingContactRequest,
            "removeOutgoingContactRequest": removeOutgoingContactRequest,
            "removeContact": removeContact,
            "adminCreate": adminCreate,
            "adminRead": adminRead,
            "adminUpdate": adminUpdate,
            "adminRemove": adminRemove,
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

        function getIncomingContactRequests() {
            return $http.get("/api/project/incomingContactRequests").then(res => res.data);
        }

        function getOutgoingContactRequests() {
            return $http.get("/api/project/outgoingContactRequests").then(res => res.data);
        }

        function removeIncomingContactRequest(id) {
            return $http.delete("/api/project/removeIncomingContactRequest/" + id).then(res => res.data);
        }

        function removeOutgoingContactRequest(id) {
            return $http.delete("/api/project/removeOutgoingContactRequest/" + id).then(res => res.data);
        }

        function requestContact(username) {
            return $http.put("/api/project/requestContact/" + username).then(res => res.data);
        }

        function removeContact(id) {
            return $http.delete("/api/project/contact/" + id).then(res => res.data);
        }

        function deleteUser(userId) {
            return $http.delete(apiUrl + "/" + userId);
        }

        function checkLoggedIn() {
            return $http.get('/api/project/loggedin').then(res => res.data);
        }

        function adminCreate(body) {
            return $http.post('/api/project/user', body).then(res => res.data);
        }
        function adminRead() {
            return $http.get('/api/project/user').then(res => res.data);
        }
        function adminUpdate(user) {
            return $http.put('/api/project/user/' + user._id, user).then(res => res.data);
        }
        function adminRemove(id) {
            $http.delete('/api/project/user/' + id);
        }
    }

})();