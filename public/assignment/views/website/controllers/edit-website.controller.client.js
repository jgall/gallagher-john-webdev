/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($scope, $routeParams, UserService, WebsiteService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
    }

})();