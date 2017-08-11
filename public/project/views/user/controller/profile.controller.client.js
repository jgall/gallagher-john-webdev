(function () {
    angular.module("MealPlanner").controller("ProfileController", ProfileController);

    function ProfileController(currentUser, UserService, $location, $timeout) {
        const vm = this;
        vm.user = currentUser;

        if (currentUser == 0) {
            $location.path("/");
        }

        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.deletUser = deleteUser;

        function logout() {
            console.log("logging out");
            UserService
                .logout()
                .then(() => $location.url('/login'));
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function () {
                    vm.alert = "Profile updated successfully.";
                    vm.hasAlert = true;
                    $timeout(() => vm.hasAlert = false, 3000);
                })
        }
    }

})();