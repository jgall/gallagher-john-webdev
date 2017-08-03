'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const websiteSchema = require("./website.schema.server");
    const websiteModel = mongoose.model("WebsiteModel", websiteSchema);
    let userModelApi = false;

    const api = {
        "exists": () => true,
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "deleteWebsitesOfUser": deleteWebsitesOfUser
    };

    return api;


    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel.create(website).then(website => {
            return getUserModelApi().addWebsite(website).then(() => website);
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
        return websiteModel.findOne({_id: websiteId}).then(website => {
            return getUserModelApi().removeWebsiteFromUser(website._user, websiteId).then(() => {
                return websiteModel.remove({_id: websiteId})
            });
        });
    }

    function deleteWebsitesOfUser(userId) {
        return websiteModel.remove({_user: userId});
    }

    function getUserModelApi() {
        if (!userModelApi) {
            userModelApi = require("../user/user.model.server");
        }
        return userModelApi;
    }

})();