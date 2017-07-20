/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        let websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        let api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            website.developerId = "" + userId;
            website._id = new Date().toUTCString();
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            return websites.filter(w => w.developerId == userId);
        }

        function findWebsiteById(websiteId) {
            return websites.find(w => w._id == websiteId);
        }

        function updateWebsite(websiteId, website) {
            let websiteToUpdate = websites.find(w => w._id == websiteId);
            websites[websites.indexOf(websiteToUpdate)] =  website;
        }

        function deleteWebsite(websiteId) {
            let websiteToDelete = websites.find(w => w._id == websiteId);
            websites.splice(websites.indexOf(websiteToDelete), 1);
        }
    }

})();