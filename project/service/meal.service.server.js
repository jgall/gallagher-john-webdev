'use strict';
module.exports = function(app) {

    let MealModelApi = require("../model/meal/meal.model.server");

    app.put("/api/project/createMeal", createMeal);


    function createMeal(req, res) {
        if (req.isAuthenticated()) {
            let meal = req.body;
            meal.owner = req.user._id;
            MealModelApi.createMeal(meal);
        } else {
            res.sendStatus(400);
        }
    }
};