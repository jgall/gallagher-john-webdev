/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("WidgetService", WidgetService);

    function WidgetService() {
        let widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        let widgetTypes = [
            "HTML", "HEADING", "YOUTUBE", "IMAGE"
        ];

        let api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes
        };

        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = new Date().getTime() + "";
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            return widgets.filter(w => w.pageId == pageId);
        }

        function findWidgetById(widgetId) {
            return widgets.find(w => w._id == widgetId);
        }

        function updateWidget(widgetId, widget) {
            widget._id = widgetId;
            let widgetToUpdate = widgets.find(w => w._id == widgetId);
            widgets.splice(widgets.indexOf(widgetToUpdate), 1, widget);
        }

        function deleteWidget(widgetId) {
            let widgetToDelete = widgets.find(w => w._id == widgetId);
            widgets.splice(widgets.indexOf(widgetToDelete), 1);
        }

        function getWidgetTypes() {
            return widgetTypes;
        }
    }

})();