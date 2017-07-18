/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditPageController", EditPageController);

    function EditPageController($scope, $routeParams, PageService, UserService, WebsiteService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

})();