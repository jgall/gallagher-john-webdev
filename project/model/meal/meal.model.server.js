'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const mealSchema = require("./meal.schema.server");
    const mealModel = mongoose.model("MealModel", mealSchema);

    const api = {
        "createMeal": createMeal,
        "updateMeal": updateMeal,
    };

    return api;

    function createMeal(meal) {
        return mealModel.create(meal);
    }

    function updateMeal(mealId, meal) {
        return mealModel.update({_id: mealId}, {$set: meal});
    }

})();