'use strict';
module.exports = function(app) {

    let key = false;

    try {
        key = require("../../env.vars.local")["X-Mashape-Key"];
    } catch (e) {
        if (process.env.X_Mashape_Key) {
            key = process.env["X_Mashape_Key"];
        }
    }

    let RecipeModelApi = require("../model/recipe/recipe.model.server");

    let spoontacularApi = require("./spoontacular.service.server")(app);

    app.post("/api/project/searchForRecipe", searchForRecipe);
    app.post("/api/project/getRecipeInformation", getRecipeInformation);


    function searchForRecipe(req, res) {
        spoontacularApi.searchForRecipe(req, res);
    }

    function getRecipeInformation(req, res) {
        RecipeModelApi.getRecipeBySId(req.body.query).then(recipe => {
            if (!recipe) {
                spoontacularApi.getRecipeInformation(req, res).then(recipe => {
                    recipe.spoontacularId = id;
                    RecipeModelApi.saveRecipe(recipe).then(r => {
                        res.json(r);
                        res.end();
                    });
                });
            } else {
                res.json(recipe);
                res.end();
            }
        });
    }

    function getRecipeInformationSpoon(sId) {
        if (cache[req.body.query]) {
            res.json(cache[req.body.query]);
            res.end();
            return;
        }
        return unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"
            + sId
            + "/information?includenutrition=false")
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                cache[req.body.query] = result.body;
                res.json(result.body);
                res.end();
                return result.body;
            });
    }

};