(function () {
    angular.module("MealPlanner").controller("AdminController", AdminController);

    function AdminController(UserService, $window, MealService, $location, RecipeService, IngredientService,
                             CommentService) {

        const vm = this;

        vm.back = back;

        vm.create = create;
        vm.read = read;
        vm.update = update;
        vm.remove = remove;

        vm.getReadContent = getReadContent;


        function create(createContent) {
            createContent = angular.fromJson(createContent);
            switch (vm.dataType) {
                case 'users':
                    UserService.adminCreate(createContent);
                    break;
                case 'meals':
                    MealService.adminCreate(createContent);
                    break;
                case 'recipes':
                    RecipeService.adminCreate(createContent);
                    break;
                case 'ingredients':
                    IngredientService.adminCreate(createContent);
                    break;
                case 'comments':
                    CommentService.adminCreate(createContent);
                    break;

            }
        }

        function read() {
            switch (vm.dataType) {
                case 'users':
                    UserService.adminRead().then(data => vm.readContent = data);
                    break;
                case 'meals':
                    MealService.adminRead().then(data => vm.readContent = data);
                    break;
                case 'recipes':
                    RecipeService.adminRead().then(data => vm.readContent = data);
                    break;
                case 'ingredients':
                    IngredientService.adminRead().then(data => vm.readContent = data);
                    break;
                case 'comments':
                    CommentService.adminRead().then(data => vm.readContent = data);
                    break;

            }
        }

        function update(updateContent) {
            updateContent = angular.fromJson(updateContent);
            switch (vm.dataType) {
                case 'users':
                    UserService.adminUpdate(updateContent);
                    break;
                case 'meals':
                    MealService.adminUpdate(updateContent);
                    break;
                case 'recipes':
                    RecipeService.adminUpdate(updateContent);
                    break;
                case 'ingredients':
                    IngredientService.adminUpdate(updateContent);
                    break;
                case 'comments':
                    CommentService.adminUpdate(updateContent);
                    break;

            }
        }

        function remove(itemToDelete) {
            switch (vm.dataType) {
                case 'users':
                    UserService.adminRemove(itemToDelete);
                    break;
                case 'meals':
                    MealService.adminRemove(itemToDelete);
                    break;
                case 'recipes':
                    RecipeService.adminRemove(itemToDelete);
                    break;
                case 'ingredients':
                    IngredientService.adminRemove(itemToDelete);
                    break;
                case 'comments':
                    CommentService.adminRemove(itemToDelete);
                    break;

            }
        }

        function getReadContent() {
            return angular.toJson(vm.readContent, true);
        }
        function back() {
            $window.history.back();
        }

    }
})();