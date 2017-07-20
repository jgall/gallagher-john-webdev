/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($scope, $routeParams, UserService, WebsiteService) {
        let vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }

        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
    }

})();