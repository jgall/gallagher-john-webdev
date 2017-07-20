/**
 * Created by jggll on 7/20/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ChooseWidgetController", ChooseWidgetController);

    function ChooseWidgetController($scope, $routeParams, UserService, WebsiteService, PageService, WidgetService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams[":wgid"];
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }

})();