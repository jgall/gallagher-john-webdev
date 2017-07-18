/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("PageService", PageService);

    function PageService() {
        let pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        let api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            return pages.filter(p => p.websiteId == websiteId);
        }

        function findPageById(pageId) {
            return pages.find(p => p._id == pageId);
        }

        function updatePage(pageId, page) {
            let pageToUpdate = pages.find(p => p._id == pageId);
            pages.splice(pages.indexOf(pageToUpdate), 1, page);
        }

        function deletePage(pageId) {
            let pageToDelete = pages.find(p => p._id == pageId);
            pages.splice(pages.indexOf(pageToDelete), 1);
        }
    }

})();