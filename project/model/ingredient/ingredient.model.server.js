'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const ingredientSchema = require("./ingredient.schema.server");
    const ingredientModel = mongoose.model("IngredientModel", ingredientSchema);

    const api = {

    };

    return api;



})();