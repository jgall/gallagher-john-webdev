(function () {
    angular.module("MealPlanner").controller("AdminController", AdminController);

    function AdminController(UserService, $window, MealService, $location, RecipeService, IngredientService,
                             CommentService, $timeout) {

        const vm = this;

        vm.back = back;

        vm.create = create;
        vm.read = read;
        vm.update = update;
        vm.remove = remove;

        vm.getReadContent = getReadContent;
        vm.getKeys = getKeys;

        init();

        function init() {
            vm.createContent = '{"username": "test", "password": "test"}';
        }

        function create(createContent) {
            console.log(createContent);
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
            (() => {
                switch (vm.dataType) {
                    case 'users':
                        return UserService.adminRemove(itemToDelete);
                        break;
                    case 'meals':
                        return MealService.adminRemove(itemToDelete);
                        break;
                    case 'recipes':
                        return RecipeService.adminRemove(itemToDelete);
                        break;
                    case 'ingredients':
                        return IngredientService.adminRemove(itemToDelete);
                        break;
                    case 'comments':
                        return CommentService.adminRemove(itemToDelete);
                        break;

                }
            })().then(() => $timeout(read, 200));
        }

        function getReadContent() {
            return vm.readContent;
        }
        function back() {
            $window.history.back();
        }

        function getKeys(obj) {
            return Object.keys(obj);
        }

    }
})();