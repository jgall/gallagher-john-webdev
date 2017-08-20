(function () {
    angular.module("MealPlanner").controller("UpdateMealController", UpdateMealController);

    function UpdateMealController($controller, $scope, MealService, $routeParams, UserService, RecipeService) {
        angular.extend(this, $controller("CreateMealController", {$scope: $scope}));
        let vm = this;

        vm.save = save;

        init();

        function init() {
            MealService.getMeal($routeParams["mealId"]).then(meal => {
                console.log(meal);
                meal.date = new Date(meal.date);
                vm.meal = meal;
                vm.recipeId = meal.recipe;
                if (vm.recipeId) {
                    RecipeService.getRecipeInformation(vm.recipeId).then(recipe => vm.recipe = recipe);
                }
            })
        }

        function save() {
            MealService.updateMeal(vm.meal);
        }

    }
})();