'use strict';
(function () {
    angular.module("MealPlanner").factory("IngredientService", IngredientService);

    function IngredientService($http) {
        let apiUrl = "/api/project";

        let api = {
            "addToStash": addToStash,
            "removeFromStash": removeFromStash,
            "search": search,
            "findById": findById,
            "getStash": getStash,
            "adminCreate": adminCreate,
            "adminRead": adminRead,
            "adminUpdate": adminUpdate,
            "adminRemove": adminRemove,
        };

        return api;

        function addToStash(ingredient) {
            console.log(ingredient);
            return $http.put("/api/project/ingredient", ingredient).then(res => res.data);
        }

        function removeFromStash(ingredientId) {
            return $http.delete("/api/project/deleteIngredient/" + ingredientId).then(res => res.data);
        }

        function search(input) {
            return $http.get("/api/project/ingredient/" + input).then(res => res.data);
        }

        function findById(id) {
            return $http.get("/api/project/ingredientId/" + id).then(res => res.data);
        }

        function getStash() {
            return $http.get("/api/project/stash").then(res => res.data);
        }

        function adminCreate(body) {
            return $http.post('/api/project/user', body).then(res => res.data);
        }
        function adminRead() {
            return $http.get('/api/project/user').then(res => res.data);
        }
        function adminUpdate(user) {
            return $http.put('/api/project/user/' + user._id, user).then(res => res.data);
        }
        function adminRemove(id) {
            $http.delete('/api/project/user/' + id);
        }

    }

})();