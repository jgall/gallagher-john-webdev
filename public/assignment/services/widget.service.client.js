/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").factory("WidgetService", WidgetService);

    function WidgetService($http) {

        let widgetTypes = [
            "HTML", "HEADING", "YOUTUBE", "IMAGE", "TEXT"
        ];

        let api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "reorderWidgets": reorderWidgets
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post('/api/page/'+ pageId +'/widget', widget).then(res => res.data);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/'+ pageId +'/widget').then(res => res.data);
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/' + widgetId).then(res => res.data);
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/' + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/' + widgetId);
        }

        function reorderWidgets(pageId, startIdx, finishIdx) {
            return $http.put('/page/' + pageId + '/widget?initial=' + startIdx+ '&final=' + finishIdx);
        }

        function getWidgetTypes() {
            return widgetTypes;
        }
    }

})();