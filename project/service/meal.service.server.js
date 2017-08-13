'use strict';
module.exports = function (app) {

    let MealModelApi = require("../model/meal/meal.model.server");
    let UserModelApi = require("../model/user/user.model.server");

    app.put("/api/project/createMeal", createMeal);
    app.put("/api/project/updateMeal", updateMeal);
    app.delete("/api/project/deleteMeal", deleteMeal);
    app.get("/api/project/getMeal", getMeal);
    app.post("/api/project/findMealsByOwner", getMealsByOwner);


    function createMeal(req, res) {
        if (req.isAuthenticated()) {
            let meal = req.body;
            meal.owner = req.user._id;
            MealModelApi.createMeal(meal).then(createdMeal => {
                res.json(createdMeal);
                res.end();
            });
        } else {
            res.sendStatus(400);
        }
    }

    function updateMeal(req, res) {
        if (req.isAuthenticated()) {
            MealModelApi.findMealById(req.body._id).then(meal => {
                if (meal.owner == req.user._id) {
                    MealModelApi.updateMeal(meal._id, req.body).then(updatedMeal => {
                        res.json(updatedMeal);
                        res.end();
                    });
                } else {
                    res.sendStatus(400);
                }
            }, err => {
                res.sendStatus(400);
            })
        } else {
            res.sendStatus(400);
        }
    }

    function deleteMeal(req, res) {
        if (req.isAuthenticated()) {
            MealModelApi.findMealById(req.body._id).then(meal => {
                if (meal.owner == req.user._id) {
                    MealModelApi.deleteMealById(meal._id).then(() => {
                        res.status(200);
                        res.end();
                    });
                } else {
                    res.sendStatus(400);
                }
            }, err => {
                res.sendStatus(400);
            })
        } else {
            res.sendStatus(400);
        }
    }

    function getMeal(req, res) {
        if (req.isAuthenticated()) {
            MealModelApi.findMealById(req.body._id).then(meal => {
                if (meal.owner == req.user._id
                    || meal.accepted.includes(req.body._id)
                    || meal.invited.includes(req.body._id)) {
                    res.json(meal);
                    res.end();
                } else {
                    res.sendStatus(400);
                }
            })
        } else {
            res.sendStatus(400);
        }
    }

    function getMealsByOwner(req, res) {
        if (req.isAuthenticated()) {
            MealModelApi.findMealsByOwner(req.user._id).then(meals => {
                console.log(meals);
                res.json(meals);
                res.end();
            });
        } else {
            res.sendStatus(400);
        }
    }
};