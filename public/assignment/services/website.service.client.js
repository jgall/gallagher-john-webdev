/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        let userApi = '/api/user/:userId/website';
        let websiteApi = '/api/website/:websiteId';

        let api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            return $http.post('/api/user/' + userId + '/website', website).then(res => res.data);
        }

        function findWebsitesByUser(userId) {
            return $http.get('/api/user/' + userId + '/website').then(res => res.data);
        }

        function findWebsiteById(websiteId) {
            return $http.get('/api/website/' + websiteId).then(res => res.data);
        }

        function updateWebsite(websiteId, website) {
            return $http.put('/api/website/' + websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/' + websiteId);
        }
    }

})();