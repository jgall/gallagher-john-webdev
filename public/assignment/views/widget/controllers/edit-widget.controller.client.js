/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($scope, $routeParams, UserService, WebsiteService, PageService, WidgetService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams[":wgid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }

})();