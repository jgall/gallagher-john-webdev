/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, UserService, $timeout) {
        const vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            UserService.findUserById(vm.userId).then(user => vm.user = user);
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