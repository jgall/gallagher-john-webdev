'use strict';
module.exports = function (app) {

    const unirest = require('unirest');

    let cache = {};

    let key = false;

    try {
        key = require("../../env.vars.local")["X-Mashape-Key"];
    } catch (e) {
        if (process.env.X_Mashape_Key) {
            key = process.env["X_Mashape_Key"];
        }
    }

    let ingredientModelApi = require("../model/ingredient/ingredient.model.server");
    let userModelApi = require("../model/user/user.model.server");

    app.put("/api/project/ingredient", addIngredientToStash);
    app.delete("/api/project/deleteIngredient/:id", removeIngredientFromStash);
    app.get("/api/project/ingredient/:input", searchForIngredients);
    app.get("/api/project/ingredientId/:id", findIngredientById);
    app.get("/api/project/stash", getStash);

    function addIngredientToStash(req, res) {
        console.log(req.body);
        if (req.isAuthenticated()) {
            console.log(req.body);
            let id = req.body.id;
            ingredientModelApi.findIngredientBySId(id).then(ingredient => {
                console.log(ingredient);
                userModelApi.addIngredient(req.user._id, ingredient._id).then(user => {
                    res.json(user);
                    res.end();
                });
            });
        } else {
            res.sendStatus(400);
        }
    }

    function removeIngredientFromStash(req, res) {
        if (req.isAuthenticated()) {
            let id = req.params.id;
            console.log(id);

            userModelApi.removeIngredient(req.user._id, id).then(user => {
                res.json(user);
                res.end();
            });
        } else {
            res.sendStatus(400);
        }
    }

    function searchForIngredients(req, res) {
        if (cache[req.params.input]) {
            res.json(cache[req.params.input]);
        } else {
            unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?metaInformation=true&number=10&query=" + req.params.input)
                .header("X-Mashape-Key", key)
                .header("Accept", "application/json")
                .end(function (result) {
                    cache[req.params.input] = result.body;

                    result.body.forEach(i => {
                        i.spoontacularId = i.id;
                        ingredientModelApi.addIngredient(i);
                    });

                    res.json(result.body);

                });
        }
    }

    function findIngredientById(req, res) {
        ingredientModelApi.findIngredientById(req.params.id).then(i => {
            res.json(i);
            res.end();
        });
    }

    function getStash(req, res) {
        if (req.isAuthenticated()) {
            if (req.user.ingredientStash.length <= 0) {
                res.json([]);
                res.end();
            } else {
                console.log(req.user.ingredientStash);
                Promise.all(req.user.ingredientStash.map(ingredientModelApi.findIngredientById)).then((arr) => {
                    return res.json(arr);
                    res.end();
                });
            }
        }
    }
};