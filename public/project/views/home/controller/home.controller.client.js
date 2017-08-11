(function () {
    angular.module("MealPlanner").controller("HomeController", HomeController);

    function HomeController(UserService, MealService) {
        const vm = this;

        vm.loggedIn = false;

        vm.searchRecipes = searchRecipes;

        function init() {
            UserService.checkLoggedIn().then(user => {
                vm.user = user;
                vm.loggedIn = user != "0";
                console.log(vm.loggedIn);
            }).then(() => {

            });
        }

        init();


        function searchRecipes(input) {

        }

    }
})();