(function () {
    angular.module("MealPlanner").controller("HomeController", HomeController);

    function HomeController(UserService, MealService, $location) {
        const vm = this;

        vm.loggedIn = false;

        vm.searchForRecipes = searchForRecipes;

        function init() {
            UserService.checkLoggedIn().then(user => {
                vm.user = user;
                vm.loggedIn = user != "0";
            }).then(() => {

            });
        }

        init();


        function searchForRecipes(input) {
            $location.path("/recipeSearch/" + input)
        }

    }
})();