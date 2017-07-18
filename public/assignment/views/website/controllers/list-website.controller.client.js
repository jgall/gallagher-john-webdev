/**
 * Created by jggll on 7/17/17.
 */
(function() {
    angular.module("WebAppMaker").controller("ListWebsiteController", ListWebsiteController);

    function ListWebsiteController($routeParams, WebsiteService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

})();