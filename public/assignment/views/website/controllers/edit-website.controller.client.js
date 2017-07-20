/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($scope, $routeParams, UserService, WebsiteService, $location) {
        let vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, angular.copy(website));
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.path("/user/" + vm.userId + "/website")
        }

        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }
        init();
    }

})();