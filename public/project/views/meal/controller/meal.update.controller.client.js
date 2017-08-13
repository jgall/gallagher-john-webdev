(function () {
    angular.module("MealPlanner").controller("UpdateMealController", UpdateMealController);

    function UpdateMealController($controller, $scope, MealService, $routeParams) {
        angular.extend(this, $controller("CreateMealController", {$scope: $scope}));
        let vm = this;

        vm.save = save;

        init();

        function init() {
            MealService.get
        }

        function save() {
            let meal = {
                name: vm.name,
                description: vm.description,
                place: vm.place,
                date: vm.date,
                selectedContacts: vm.selectedContacts,
                viewByLink: vm.viewByLink
            };
            MealService.updateMeal(meal);
        }

    }
})();