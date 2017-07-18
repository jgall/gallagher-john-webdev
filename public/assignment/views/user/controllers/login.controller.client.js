/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location) {
        let vm = this;

        vm.login = login;

        function login(username, password) {
            let user = UserService.findUserByCredentials(username, password);
            if (user) {
                $location.path("/user/" + user._id);
            } else {
                vm.alert = "Unable to login"
            }
        }
    }

})();