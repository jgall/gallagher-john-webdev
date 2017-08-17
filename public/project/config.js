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

    function currentUser($location, UserService) {
        return UserService.checkLoggedIn();
    }

})();