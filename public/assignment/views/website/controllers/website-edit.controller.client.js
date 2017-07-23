/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($scope, $routeParams, UserService, WebsiteService, $location, $timeout) {
        let vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, angular.copy(website)).then(() => {
                WebsiteService.findWebsitesByUser(vm.userId).then(data => vm.websites = data);
                vm.alert = "Website updated.";
                vm.hasAlert = true;
                $timeout(() => vm.hasAlert = false, 3000);
            });

        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId).then(() => {
                $location.path("/user/" + vm.userId + "/website")
            });
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).then(data => vm.websites = data);
            WebsiteService.findWebsiteById(vm.websiteId).then(data => vm.website = data);
        }
        init();
    }

})();