(function () {
    angular.module("MealPlanner").controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($location, $routeParams, RecipeService, UserService, $window) {
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
        vm.selectRecipe = selectRecipe;
        vm.back = back;

        function searchForRecipe(text) {
            return RecipeService.searchForRecipe(text).then(recipes => {
                vm.recipes = recipes;
                console.log(recipes);
            })
        }

        function searchForRecipeByRoute(text) {
            $location.path("/recipeSearch/" + text);
        }

        function selectRecipe(recipe) {
            $location.path("/recipeDetail/" + recipe.id)
        }

        function back() {
            $window.history.back();
        }
    }
})();