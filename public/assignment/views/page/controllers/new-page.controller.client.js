/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("NewPageController", NewPageController);

    function NewPageController($scope, $routeParams, PageService) {
        const vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;

        function createPage(page) {
            PageService.createPage(vm.websiteId, angular.copy(page));
        }

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).then(data => vm.pages = data);
        }
        init();
    }

})();