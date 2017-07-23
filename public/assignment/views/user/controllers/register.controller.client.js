/**
 * Created by jggll on 7/17/17.
 */
(function () {
    angular.module("WebAppMaker").controller("RegisterController", RegisterController);

    function RegisterController($scope, UserService, $location) {
        let vm = this;

        vm.register = register;

        function register(user) {
            UserService.createUser(user)
                .then(() => UserService.findUserByCredentials(user.username, user.password)
                    .then(user => $location.path("/user/" + user._id)));
        }
    }

})();