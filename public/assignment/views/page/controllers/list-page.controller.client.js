/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ListPageController", ListPageController);

    function ListPageController($scope, $routeParams, PageService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).then(data => vm.pages = data);
        }
        init();
    }

})();