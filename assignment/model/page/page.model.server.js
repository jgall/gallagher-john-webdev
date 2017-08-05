'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const pageSchema = require("./page.schema.server");
    const pageModel = mongoose.model("PageModel", pageSchema);
    let websiteModelApi;
    let widgetModelApi;

    const api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
        "deletePagesOfWebsite": deletePagesOfWebsite,
        "addWidgetToPage": addWidgetToPage,
        "removeWidgetFromPage": removeWidgetFromPage
    };

    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return pageModel.create(page).then(createdPage =>
            getWebsiteModelApi().addPageToWebsite(websiteId, page._id));
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return pageModel.update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return Promise.all([
            pageModel.findOne({_id: pageId})
                .then(page => getWebsiteModelApi().removePageFromWebsite(page._website, pageId))
            , getWidgetModelApi().deleteWidgetsOfPage(pageId)])
            .then(pageModel.remove({_id: pageId}));
    }

    function deletePagesOfWebsite(websiteId) {
        return findAllPagesForWebsite(websiteId).then(pages =>
            Promise.all(pages.map(p => deletePage(p._id))))
    }

    function addWidgetToPage(pageId, widgetId) {
        return pageModel.update({_id: pageId}, {$push: {widgets: widgetId}});
    }

    function removeWidgetFromPage(pageId, widgetId) {
        return pageModel.update({_id: pageId}, {$pullAll: {widgets: [widgetId]}});
    }

    function getWebsiteModelApi() {
        if (!websiteModelApi) {
            websiteModelApi = require("../website/website.model.server");
        }
        return websiteModelApi;
    }

    function getWidgetModelApi() {
        if (!widgetModelApi) {
            widgetModelApi = require("../widget/widget.model.server");
        }
        return widgetModelApi;
    }

})();