/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("NewPageController", NewPageController);

    function NewPageController($scope, $routeParams, PageService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;

        function createPage(page) {
            PageService.createPage(vm.websiteId, angular.copy(page));
        }

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();
    }

})();