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
            "deleteMeal": deleteMeal,
            "getMeal": getMeal,
            "findMealsByOwner": findMealsByOwner
        };

        return api;

        function createMeal(meal) {
            return $http.put("/api/project/createMeal", meal).then(res => res.data);
        }

        function updateMeal(meal) {
            return $http.put("/api/project/updateMeal", meal).then(res => res.data);
        }

        function deleteMeal(mealId) {
            return $http.delete("/api/project/deleteMeal", {_id: mealId}).then(res => res.data);
        }

        function getMeal(mealId) {
            return $http.get("/api/project/getMeal", {_id: mealId}).then(res => res.data);
        }

        function findMealsByOwner(userId) {
            return $http.post("/api/project/findMealsByOwner", {userId: userId}).then(res => res.data);
        }

    }

})();