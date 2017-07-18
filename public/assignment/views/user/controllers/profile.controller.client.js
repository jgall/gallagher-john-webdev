/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, UserService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

    }

})();