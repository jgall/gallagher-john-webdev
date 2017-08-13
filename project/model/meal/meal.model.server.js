'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const mealSchema = require("./meal.schema.server");
    const mealModel = mongoose.model("MealModel", mealSchema);

    const api = {
        "createMeal": createMeal,
        "updateMeal": updateMeal,
        "findMealById": findMealById,
        "deleteMealById": deleteMealById,
        "addComment": addComment,
        "findMealsByOwner": findMealsByOwner
    };

    return api;

    function createMeal(meal) {
        return mealModel.create(meal);
    }

    function updateMeal(mealId, meal) {
        return mealModel.update({_id: mealId}, {$set: meal});
    }

    function findMealById(mealId) {
        return mealModel.findById(mealId);
    }

    function deleteMealById(mealId) {
        return mealModel.remove({_id: mealId});
    }

    function addComment(mealId, commentId) {
        return mealModel.update({_id: mealId}, {$push: {comments: commentId}});
    }

    function findMealsByOwner(userId) {
        return mealModel.find({owner: userId})
    }

})();