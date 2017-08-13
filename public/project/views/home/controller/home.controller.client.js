(function () {
    angular.module("MealPlanner").controller("HomeController", HomeController);

    function HomeController(UserService, MealService, $location) {
        const vm = this;

        vm.loggedIn = false;
        vm.meals = [];

        vm.searchForRecipes = searchForRecipes;
        vm.deleteMeal = deleteMeal;

        init();

        function init() {
            UserService.checkLoggedIn().then(user => {
                console.log(user);
                vm.user = user;
                vm.loggedIn = user != "0";
                if (vm.loggedIn) {
                    MealService.findMealsByOwner(user._id).then(meals => {
                        console.log(meals);
                        vm.meals = meals;
                    })
                }

            }).then(() => {

            });
        }

        function searchForRecipes(input) {
            $location.path("/recipeSearch/" + input)
        }

        function deleteMeal(meal) {
            MealService.deleteMeal(meal._id).then(() => {
                MealService.findMealsByOwner(vm.user._id).then(meals => {
                    vm.meals = meals;
                })
            });
        }

    }
})();