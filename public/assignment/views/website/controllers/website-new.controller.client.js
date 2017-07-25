/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($scope, $routeParams, WebsiteService, $location) {
        const vm = this;

        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if (website.name) {
                WebsiteService.createWebsite(vm.userId, website).then(() => {
                    $location.path("/user/" + vm.userId + "/website");
                });
            }
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).then(data => vm.websites = data);
        }

        init();
    }

})();