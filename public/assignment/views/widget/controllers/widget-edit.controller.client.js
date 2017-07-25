/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($scope, $routeParams, $location, WebsiteService, PageService, WidgetService) {
        const vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams["wgid"];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget).then(() => {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId
                    + "/page/" + vm.pageId + "/widget/");
            });
        }

        function deleteWidget(widget) {
            WidgetService.deleteWidget(widget._id).then(() => {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId
                    + "/page/" + vm.pageId + "/widget/");
            });
        }

        function init() {
            WidgetService.findWidgetById(vm.widgetId).then(data => vm.widget = data);
        }

        init();
    }

})();