/**
 * Created by jggll on 7/17/17.
 */
(function () {
    let app = angular.module("POC", ["ngRoute", "ngAnimate"]);

    app.controller("PocController", function ($http) {
        const vm = this;

        vm.quickAnswerResponse = "";
        vm.recipeSearchResponse = [];

        vm.selectedRecipe = {};

        vm.quickAnswer = (query) => {
            $http.post("/api/poc/quickAnswer", {query}).then(res => {
                console.log(res.data);
                vm.quickAnswerResponse = res.data;
                if (!res.data) {
                    vm.quickAnswerResponse = "Unable to answer given question. Try another question?"
                }
            });
        };

        vm.recipeSearch = (query) => {
            $http.post("/api/poc/recipeSearch", {query}).then(res => {
                console.log(angular.toJson(res.data));
                vm.recipeSearchResponse = res.data
            });
        };

        vm.clickRecipe = (recipe) => {
            console.log("recipe clicked: " + angular.toJson(recipe));
            $http.post("/api/poc/getRecipeInformation", {query: recipe.id}).then(res => {
                console.log(res.data);
                vm.selectedRecipe = res.data;
            })
        }
    })

})();