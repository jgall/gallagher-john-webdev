(function () {
    angular.module("MealPlanner").controller("RecipeCreateController", RecipeCreateController);

    function RecipeCreateController($location, RecipeService, UserService, $window, $routeParams, $sce, $timeout) {
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
        vm.back = back;
        vm.sanitize = sanitize;
        vm.createRecipe = createRecipe;

        function searchForRecipe(text) {
            $location.path("/recipeSearch/" + text);

        }

        function back() {
            $window.history.back();
        }

        function sanitize(html) {
            return $sce.trustAsHtml(html);
        }

        function createRecipe(recipe) {
            RecipeService.createRecipe(recipe).then(rec => {
                $location.path("/");
            });
        }
    }
})();