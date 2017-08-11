'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const recipeSchema = require("./recipe.schema.server");
    const recipeModel = mongoose.model("RecipeModel", recipeSchema);

    const api = {

    };

    return api;



})();