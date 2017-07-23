/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("EditPageController", EditPageController);

    function EditPageController($scope, $routeParams, PageService, $location, WebsiteService, $timeout) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            PageService.updatePage(vm.pageId, angular.copy(page));
            PageService.findPagesByWebsiteId(vm.websiteId).then(data => vm.pages = data);
            vm.alert = "Page updated.";
            vm.hasAlert = true;
            $timeout(() => vm.hasAlert = false, 3000);
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId).then(() => {
                $location.path("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });
        }

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId).then(data => vm.pages = data);
            PageService.findPageById(vm.pageId).then(data => vm.page = data);
        }
        init();
    }

})();