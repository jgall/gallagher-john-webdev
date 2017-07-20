/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($scope, $routeParams, WebsiteService) {
        let vm = this;

        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            WebsiteService.createWebsite(523, website);
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

})();