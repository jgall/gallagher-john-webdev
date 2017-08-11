'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const mealSchema = require("./meal.schema.server");
    const mealModel = mongoose.model("MealModel", mealSchema);

    const api = {

    };

    return api;



})();