(function () {
    angular.module("MealPlanner").controller("HomeController", HomeController);

    function HomeController(UserService, MealService, $location) {
        const vm = this;

        vm.loggedIn = false;
        vm.meals = [];

        vm.searchForRecipes = searchForRecipes;

        init();

        function init() {
            UserService.checkLoggedIn().then(user => {
                console.log(user);
                vm.user = user;
                vm.loggedIn = user != "0";
                if (vm.loggedIn) {
                    MealService.findMealsByOwner(user._id).then(meals => {
                        vm.meals = meals;
                    })
                }

            }).then(() => {

            });
        }

        function searchForRecipes(input) {
            $location.path("/recipeSearch/" + input)
        }

    }
})();