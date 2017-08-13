(function () {
    angular.module("MealPlanner").controller("UpdateMealController", UpdateMealController);

    function UpdateMealController($controller, $scope, MealService, $routeParams) {
        angular.extend(this, $controller("CreateMealController", {$scope: $scope}));
        let vm = this;

        vm.save = save;

        init();

        function init() {
            MealService.getMeal($routeParams["mealId"]).then(meal => {
                vm.meal = meal;
            })
        }

        function save() {
            MealService.updateMeal(vm.meal);
        }

    }
})();