'use strict';
module.exports = function (app) {
    const unirest = require('unirest');

    let cache = {};

    let key = false;

    try {
        key = require("../env.vars.local")["X-Mashape-Key"];
    } catch (e) {
        if (process.env.X_Mashape_Key) {
            key = process.env["X_Mashape_Key"];
        }
    }

    app.post('/api/poc/quickAnswer', quickAnswer);
    app.post('/api/poc/recipeSearch', recipeSearch);
    app.post('/api/poc/getRecipeInformation', getRecipeInformation);

    function quickAnswer(req, res) {
        if (cache[req.body.query]) {
            res.json(cache[req.body.query]);
            res.end();
            return;
        }
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/quickAnswer?q="
            + req.body.query.split(" ").join("+"))
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                cache[req.body.query] = result.body.answer;
                res.json(result.body.answer);
                res.end();
            });
    }

    function recipeSearch(req, res) {
        if (cache[req.body.query]) {
            res.json(cache[req.body.query]);
            res.end();
            return;
        }
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="
            + req.body.query.split(" ").join("+"))
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                cache[req.body.query] = result.body.results;
                res.json(result.body.results);
                res.end();
            });
    }

    function getRecipeInformation(req, res) {
        if (cache[req.body.query]) {
            res.json(cache[req.body.query]);
            res.end();
            return;
        }
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"
            + req.body.query
            + "/information?includenutrition=false")
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                cache[req.body.query] = result.body;
                res.json(result.body);
                res.end();
            });
    }
};