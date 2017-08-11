/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("MealPlanner").controller("LoginController", LoginController);

    function LoginController(UserService, $location, $timeout) {
        const vm = this;

        vm.hasAlert = false;

        vm.login = login;

        function login(username, password) {
            UserService.login(username, password).then(user => {
                console.log(user);
                if (!!user) {
                    $timeout(() => $location.path("/profile"), 1);
                } else {
                    $timeout(() => vm.hasAlert = true, 1);
                    vm.alert = "Unable to login";
                    $timeout(() => vm.hasAlert = false, 4000);
                }
            }, err => {
                console.log(err);
                $timeout(() => vm.hasAlert = true, 1);
                vm.alert = "Unable to login";
                $timeout(() => vm.hasAlert = false, 4000);
            });
        }
    }

})();