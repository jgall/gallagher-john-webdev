(function () {
    angular.module("MealPlanner").config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/template/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {currentUser: currentUser}
            })
            .when("/login", {
                templateUrl: "views/user/template/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/template/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/template/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: currentUser
                }
            })
            .otherwise({redirectTo: "/"});
    }

    async function checkLoggedIn($location, UserService) {

    }

    async function currentUser($location, UserService) {
        return await UserService.checkLoggedIn();
    }

})();