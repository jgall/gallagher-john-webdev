(function () {
    angular.module("MealPlanner").config(Config);

    function Config($routeProvider, $locationProvider) {
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
                    currentUser: checkLoggedIn
                }
            })
            .when("/stash", {
                templateUrl: "views/ingredient/template/stash.view.client.html",
                controller: "StashController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/contacts", {
                templateUrl: "views/contact/template/contact.view.client.html",
                controller: "ContactController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/recipeSearch/:recipeQuery", {
                templateUrl: "views/recipe/template/recipe.search.view.client.html",
                controller: "RecipeSearchController",
                controllerAs: "model"
            })
            .when("/recipeDetail/:recipeId", {
                templateUrl: "views/recipe/template/recipe.detail.view.client.html",
                controller: "RecipeDetailController",
                controllerAs: "model"
            })
            .when("/recipeCreate", {
                templateUrl: "views/recipe/template/recipe.create.view.client.html",
                controller: "RecipeCreateController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkIsChef
                }
            })
            .when("/mealCreate", {
                templateUrl: "views/meal/template/meal.create.view.client.html",
                controller: "CreateMealController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/mealUpdate/:mealId", {
                templateUrl: "views/meal/template/meal.create.view.client.html",
                controller: "UpdateMealController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/user/template/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkIsAdmin
                }
            })
            .otherwise({redirectTo: "/"});
    }

    function checkLoggedIn(UserService, $q, $location) {
        let deferred = $q.defer();

        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkIsChef(UserService, $q, $location) {
        let deferred = $q.defer();

        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else if (user.roles.includes("CHEF")) {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });

        return deferred.promise;
    }

    function checkIsAdmin(UserService, $q, $location) {
        let deferred = $q.defer();

        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else if (user.roles.includes("ADMIN")) {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });

        return deferred.promise;
    }

    function currentUser($location, UserService) {
        return UserService.checkLoggedIn();
    }

})();