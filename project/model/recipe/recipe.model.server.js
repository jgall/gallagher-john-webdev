'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const recipeSchema = require("./recipe.schema.server");
    const recipeModel = mongoose.model("RecipeModel", recipeSchema);

    const api = {
        saveRecipe: saveRecipe,
        getRecipeById: getRecipeById,
        getRecipeBySId: getRecipeBySId
    };

    return api;

    function saveRecipe(recipe) {
        return recipeModel.findOne({spoontacularId: recipe.spoontacularId}).then(found => {
            return recipeModel.update({_id: found._id}, recipe);
        }, err => {
            return recipeModel.create(recipe);
        })
    }
    
    function getRecipeById(id) {
        return recipeModel.findById(id);
    }
    
    function getRecipeBySId(sId) {
        return recipeModel.findOne({spoontacularId: sId})
    }

})();