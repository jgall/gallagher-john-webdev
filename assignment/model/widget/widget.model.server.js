'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const widgetSchema = require("./widget.schema.server");
    const widgetModel = mongoose.model("WidgetModel", widgetSchema);

    const api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reorderWidget": reorderWidget
    };

    return api;


    function createWidget(pageId, widget) {
    }

    function findAllWidgetsForPage(pageId) {
    }

    function findWidgetById(widgetId) {
    }

    function updateWidget(widgetId, widget) {
    }

    function deleteWidget(widgetId) {
    }

    function reorderWidget(pageId, start, end) {
    }

})();