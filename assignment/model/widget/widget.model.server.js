'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const widgetSchema = require("./widget.schema.server");
    const widgetModel = mongoose.model("WidgetModel", widgetSchema);
    let pageModelApi = false;

    const api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget,
        "deleteWidgetsOfPage": deleteWidgetsOfPage,
        "findAllWidgets": () => widgetModel.find({}) // for testing purposes
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return widgetModel.create(widget).then(createdWidget => {
            return getPageModelApi().addWidgetToPage(pageId, createdWidget._id).then(() => createdWidget);
        });
    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return widgetModel.findOne({_id: widgetId}).then(widget => getPageModelApi()
            .removeWidgetFromPage(widget._page, widgetId))
            .then(() => widgetModel.remove({_id: widgetId}));
    }

    function reorderWidget(pageId, start, end) {
        return getPageModelApi().findPageById(pageId).then(page => getPageModelApi()
            .updatePage(pageId, {widgets: moveInArray(page.widgets, start, end)}))
    }

    function deleteWidgetsOfPage(pageId) {
        return findAllWidgetsForPage(pageId).then(widgets =>
            Promise.all(widgets.map(w => deleteWidget(w._id))));
    }

    function getPageModelApi() {
        if (!pageModelApi) {
            pageModelApi = require("../page/page.model.server");
        }
        return pageModelApi;
    }

    function moveInArray(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            let k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    }

})();