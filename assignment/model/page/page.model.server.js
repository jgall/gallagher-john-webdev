'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const pageSchema = require("./page.schema.server");
    const pageModel = mongoose.model("PageModel", pageSchema);

    const api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage, "deletePage": deletePage
    };

    return api;


    function createPage(websiteId, page) {

    }

    function findAllPagesForWebsite(websiteId) {

    }

    function findPageById(pageId) {

    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {

    }

})();