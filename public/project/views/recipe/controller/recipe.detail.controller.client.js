(function () {
    angular.module("MealPlanner").controller("RecipeDetailController", RecipeDetailController);

    function RecipeDetailController($location, RecipeService, UserService, $window, $routeParams) {
        const vm = this;

        function init() {

            vm.recipeId = $routeParams["recipeId"];

            console.log("recipeId: " + vm.recipeId);

            RecipeService.getRecipeInformation(vm.recipeId).then(recipeInfo => {
                vm.recipe = recipeInfo;
                console.log(recipeInfo);
            });

            UserService.checkLoggedIn().then(user => {
                vm.user = user;
                vm.loggedIn = user != "0";
            }).then(() => {

            });
        }

        init();

        vm.searchForRecipe = searchForRecipe;
        vm.planMeal = planMeal;
        vm.back = back;

        function searchForRecipe(text) {
            $location.path("/recipeSearch/" + text);

        }

        function planMeal(r) {

        }

        function back() {
            $window.history.back();
        }
    }
})();