/**
 * Created by jggll on 7/17/17.
 */
(function () {
    let app = angular.module("POC", ["ngRoute", "ngAnimate"]);

    app.controller("PocController", function ($http) {
        const vm = this;

        vm.quickAnswerResponse = "";
        vm.recipeSearchResponse = [];

        vm.quickAnswer = (query) => {
            $http.post("/api/poc/quickAnswer", {query}).then(res => {
                console.log(res.data);
                vm.quickAnswerResponse = res.data;
            });
        };

        vm.recipeSearch = (query) => {
            $http.post("/api/poc/recipeSearch", {query}).then(res => {
                console.log(res.data);
                vm.recipeSearchResponse = res.data
            });
        }
    })

})();