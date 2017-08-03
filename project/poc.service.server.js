'use strict';
module.exports = function (app) {
    const unirest = require('unirest');

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

    function quickAnswer(req, res) {
        console.log(req.body);
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/quickAnswer?q="
            + req.body.query.split(" ").join("+"))
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                res.json(result.body.answer);
                res.end();
            });
    }

    function recipeSearch(req, res) {
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="
            + req.body.query.split(" ").join("+"))
            .header("X-Mashape-Key", key)
            .header("Accept", "application/json")
            .end(function (result) {
                res.json(result.body);
                res.end();
            });
    }
};