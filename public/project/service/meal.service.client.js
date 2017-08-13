/**
 * Created by jggll on 7/17/17.
 */
'use strict';
(function () {
    angular.module("MealPlanner").factory("MealService", MealService);

    function MealService($http) {
        let apiUrl = "/api/project";

        let api = {
            "createMeal": createMeal,
            "updateMeal": updateMeal,
        };

        return api;

        function createMeal(meal) {
            return $http.put("/api/project/createMeal", meal).then(res => res.data);
        }

        function updateMeal(meal) {
            return $http.put("/api/project/updateMeal", meal).then(res => res.data);
        }

    }

})();