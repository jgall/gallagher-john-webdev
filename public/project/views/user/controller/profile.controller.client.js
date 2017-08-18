(function () {
    angular.module("MealPlanner").controller("ProfileController", ProfileController);

    function ProfileController(currentUser, UserService, $location, $timeout) {
        const vm = this;
        vm.user = currentUser;

        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.deletUser = deleteUser;
        vm.back = back;

        init();

        function init() {
            if (currentUser == 0) {
                $location.path("/");
            }

            vm.isChef = currentUser.roles.includes("CHEF");
            vm.isAdmin = currentUser.roles.includes("ADMIN");
        }

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
                    vm.error = "Unable to unregister you";
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

        function back() {
            $location.path("/");
        }
    }

})();