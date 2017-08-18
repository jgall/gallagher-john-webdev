/**
 * Created by jggll on 7/17/17.
 */
'use strict';
(function () {
    angular.module("MealPlanner").factory("RecipeService", RecipeService);

    function RecipeService($http) {
        let apiUrl = "/api/project";

        let api = {
            searchForRecipe: searchForRecipe,
            getRecipeInformation: getRecipeInformation,
            createRecipe: createRecipe,
        };

        return api;

        function searchForRecipe(text) {
            return $http.post("/api/project/searchForRecipe", {query: text}).then(res => res.data);
        }

        function getRecipeInformation(recipeId) {
            return $http.post("/api/project/getRecipeInformation", {query: recipeId}).then(res => res.data);
        }

        function createRecipe(recipe) {
            return $http.put("/api/project/createRecipe", recipe).then(res => res.data);
        }

    }

})();