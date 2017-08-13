(function () {
    angular.module("MealPlanner").controller("RecipeDetailController", RecipeDetailController);

    function RecipeDetailController($location, RecipeService, UserService, $window, $routeParams, $sce, $timeout) {
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
        vm.sanitize = sanitize;

        function searchForRecipe(text) {
            $location.path("/recipeSearch/" + text);

        }

        function planMeal(recipe) {
            if (vm.loggedIn) {
                $location.path('/mealCreate').search({recipeId: vm.recipeId});
            } else {
                vm.alert = "Planning meals may only be done when signed in.";
                vm.hasAlert = true;
                $timeout(() => vm.hasAlert = false, 4000);
            }
        }

        function back() {
            $window.history.back();
        }

        function sanitize(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();