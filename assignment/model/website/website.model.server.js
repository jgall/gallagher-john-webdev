'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const websiteSchema = require("./website.schema.server");
    const websiteModel = mongoose.model("WebsiteModel", websiteSchema);
    const userModelApi = require("../user/user.model.server");

    const api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite
    };

    return api;


    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel.create(website).then(userModelApi.addWebsite);
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
        return websiteModel.findOne(websiteId).then(website =>
            userModelApi.removeWebsiteFromUser(website._user, websiteId).then(() =>
                websiteModel.delete(websiteId)
            )
        )
    }

})();