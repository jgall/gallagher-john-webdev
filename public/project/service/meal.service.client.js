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
            "findMealsByOwner": findMealsByOwner,
            "adminCreate": adminCreate,
            "adminRead": adminRead,
            "adminUpdate": adminUpdate,
            "adminRemove": adminRemove,
        };

        return api;

        function createMeal(meal) {
            return $http.put("/api/project/createMeal", meal).then(res => res.data);
        }

        function updateMeal(meal) {
            return $http.put("/api/project/updateMeal", meal).then(res => res.data);
        }

        function deleteMeal(mealId) {
            return $http.post("/api/project/deleteMeal", {_id: mealId}).then(res => res.data);
        }

        function getMeal(mealId) {
            return $http.get("/api/project/getMeal/" + mealId).then(res => res.data);
        }

        function findMealsByOwner(userId) {
            return $http.post("/api/project/findMealsByOwner", {userId: userId}).then(res => res.data);
        }

        function getAllMeals() {
            return $http.get("/api/project/getAllMeals").then(res => res.data);
        }

        function adminCreate(body) {
            return $http.post('/api/project/meal/adminCreate', body).then(res => res.data);
        }

        function adminRead() {
            return $http.get('/api/project/meal/adminRead').then(res => res.data);
        }

        function adminUpdate(meal) {
            return $http.put('/api/project/meal/adminUpdate/' + meal._id, meal).then(res => res.data);
        }

        function adminRemove(id) {
            $http.delete('/api/project/meal/adminRemove/' + id);
        }

    }

})();