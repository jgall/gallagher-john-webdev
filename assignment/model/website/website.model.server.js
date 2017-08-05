'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const websiteSchema = require("./website.schema.server");
    const websiteModel = mongoose.model("WebsiteModel", websiteSchema);
    let userModelApi = false;
    let pageModelApi = false;

    const api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "deleteWebsitesOfUser": deleteWebsitesOfUser,
        "addPageToWebsite": addPageToWebsite,
        "removePageFromWebsite": removePageFromWebsite
    };

    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel.create(website).then(createdWebsite => {
            return getUserModelApi().addWebsiteToUser(userId, createdWebsite._id).then(() => createdWebsite);
        });
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update({_id: websiteId}, website);
    }

    function deleteWebsite(websiteId) {
        return Promise.all([
            websiteModel.findOne({_id: websiteId})
                .then(website => getUserModelApi().removeWebsiteFromUser(website._user, websiteId))
            , getPageModelApi().deletePagesOfWebsite(websiteId)])
            .then(websiteModel.remove({_id: websiteId}));
    }

    function deleteWebsitesOfUser(userId) {
        return findAllWebsitesForUser(userId).then(websites =>
            Promise.all(websites.map(w => deleteWebsite(w._id))));
    }

    function addPageToWebsite(websiteId, pageId) {
        return websiteModel.update({_id: websiteId}, {$push: {pages: pageId}});
    }

    function removePageFromWebsite(websiteId, pageId) {
        return websiteModel.update({_id: websiteId}, {$pullAll: {pages: [pageId]}});
    }

    function getUserModelApi() {
        if (!userModelApi) {
            userModelApi = require("../user/user.model.server");
        }
        return userModelApi;
    }

    function getPageModelApi() {
        if (!pageModelApi) {
            pageModelApi = require("../page/page.model.server");
        }
        return pageModelApi;
    }

})();