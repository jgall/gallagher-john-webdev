(function () {
    angular.module("MealPlanner").controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $timeout) {
        const vm = this;

        vm.register = register;

        function register(user) {
            return UserService.register(user.username, user.password)
                .then(u => UserService.login(u.username, u.password),
                    err => {
                    vm.alert = err;
                    vm.hasAlert = true;
                    $timeout(() => vm.hasAlert = false, 4000);
                })
        }
    }

})();