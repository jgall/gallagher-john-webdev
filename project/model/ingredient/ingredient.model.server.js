'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const ingredientSchema = require("./ingredient.schema.server");
    const ingredientModel = mongoose.model("IngredientModel", ingredientSchema);

    const api = {
        addIngredient: addIngredient,
        findIngredientBySId: findIngredientBySId,
        findIngredientById: findIngredientById
    };

    return api;

    function addIngredient(ingredient) {
        return ingredientModel.create(ingredient);
    }

    function findIngredientBySId(sId) {
        return ingredientModel.findOne({spoontacularId: sId});
    }

    function findIngredientById(id) {
        return ingredientModel.findById(id);
    }


})();