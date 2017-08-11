(function () {
    angular.module("MealPlanner").controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($location, $routeParams, RecipeService, UserService) {
        const vm = this;

        function init() {

            vm.searchInput = $routeParams["recipeQuery"];

            if (!vm.searchInput) {
                vm.searchInput = "";
            }
            searchForRecipe(vm.searchInput);
            UserService.checkLoggedIn().then(user => {
                vm.user = user;
                vm.loggedIn = user != "0";
            }).then(() => {

            });
        }

        init();

        vm.searchForRecipe = searchForRecipeByRoute;

        function searchForRecipe(text) {
            return RecipeService.searchForRecipe(text).then(recipes => {
                vm.recipes = recipes;
                console.log(recipes);
            })
        }

        function searchForRecipeByRoute(text) {
            $location.path("/recipeSearch/" + text);
        }
    }
})();