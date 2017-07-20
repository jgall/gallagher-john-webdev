/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, UserService, $timeout) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.updateUser = updateUser;
        function updateUser() {
            UserService.updateUser(vm.userId, vm.user);
            vm.alert = "Profile updated successfully.";
            vm.hasAlert = true;
            $timeout(() => vm.hasAlert = false, 3000);
        }

    }

})();