/**
 * Created by jggll on 7/20/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ListWidgetController", ListWidgetController);

    function ListWidgetController($routeParams, WidgetService, $sce) {
        const vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams[":wgid"];

        vm.loadUrl = loadUrl;
        vm.sanitize = sanitize;
        vm.onMove = onMove;
        vm.getViewUrl = getViewUrl;

        function loadUrl(url) {
            let modifiedUrl = url.replace("www.youtube.com/watch?v=", "www.youtube.com/embed/")
                .replace("youtu.be/", "youtube.com/embed/");
            return $sce.trustAsResourceUrl(modifiedUrl);
        }

        function sanitize(html) {
            return $sce.trustAsHtml(html);
        }

        function onMove(startIdx, finishIdx) {
            WidgetService.reorderWidgets(vm.pageId, startIdx, finishIdx);
        }

        function getViewUrl(widget) {
            return 'views/widget/templates/widget-' + widget.type.toLowerCase() + '.view.client.html';
        }

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId).then(data => vm.widgets = data);
        }

        init();
    }

})();