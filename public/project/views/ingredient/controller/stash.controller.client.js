(function () {
    angular.module("MealPlanner").controller("StashController", StashController);

    function StashController(UserService, $routeParams, $window, IngredientService, currentUser) {
        const vm = this;

        vm.back = back;
        vm.addToStash = addToStash;
        vm.removeFromStash = removeFromStash;

        init();

        function init() {
            vm.user = currentUser;
            IngredientService.getStash().then(stash => vm.stash = stash);
        }

        function back() {
            $window.history.back();
        }

        function addToStash(newIngredient) {
            if (!vm.stash.find(i => i.id == newIngredient.id)) {
                IngredientService.search(newIngredient).then(arr => {
                    vm.stash.push(arr[0]);
                    IngredientService.addToStash(arr[0]).then(() => {
                        IngredientService.getStash().then(stash => vm.stash = stash);
                    });
                });
            }
        }

        function removeFromStash(ingredient) {
            vm.stash.splice(vm.stash.indexOf(ingredient), 1);
            IngredientService.removeFromStash(ingredient._id).then(() => {
                IngredientService.getStash().then(stash => vm.stash = stash);
            });
        }

    }
})();