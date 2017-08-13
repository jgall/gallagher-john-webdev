(function () {
    angular.module("MealPlanner").controller("CreateMealController", CreateMealController);

    function CreateMealController(MealService, RecipeService, currentUser, $location, $routeParams, $sce, $window,
                                  UserService) {
        const vm = this;

        vm.searchForRecipe = searchForRecipe;
        vm.back = back;
        vm.sanitize = sanitize;
        vm.save = save;
        vm.meal = {};

        vm.contacts = [];

        init();

        function init() {
            vm.user = currentUser;

            if (currentUser == 0) {
                $location.path("/");
            }

            UserService.getContacts().then(contacts => vm.contacts = contacts);

            vm.recipeId = $routeParams["recipeId"];

            if (vm.recipeId) {
                RecipeService.getRecipeInformation(vm.recipeId).then(recipe => vm.recipe = recipe);
            }
        }

        function searchForRecipe(text) {
            $location.path("/recipeSearch/" + text);
        }

        function back() {
            $window.history.back();
        }

        function sanitize(html) {
            return $sce.trustAsHtml(html);
        }

        function save() {
            vm.meal.recipe = vm.recipeId;
            MealService.createMeal(vm.meal).then(meal => {
                $location.path("/");
            });
        }

    }
})();