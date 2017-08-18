'use strict';
module.exports = function (app) {

    let MealModelApi = require("../model/meal/meal.model.server");
    let UserModelApi = require("../model/user/user.model.server");

    app.put("/api/project/createMeal", createMeal);
    app.put("/api/project/updateMeal", updateMeal);
    app.post("/api/project/deleteMeal", deleteMeal);
    app.get("/api/project/getMeal", getMeal);
    app.post("/api/project/findMealsByOwner", getMealsByOwner);
    app.get("/api/project/getAllMeals", getAllMeals);

    app.post('/api/project/meal/adminCreate', adminCreate);
    app.get('/api/project/meal/adminRead', adminRead);
    app.put('/api/project/meal/adminUpdate/:id', adminUpdate);
    app.delete('/api/project/meal/adminRemove/:id', adminRemove);


    function adminCreate(req, res) {
        if (isAdmin(req.user)) {
            MealModelApi.createMeal(req.body).then(meal => {
                res.json(meal);
            });
        } else {
            res.status(403);
        }
    }
    function adminRead(req, res) {
        if (isAdmin(req.user)) {
            MealModelApi.getAllMeals().then(meals => {
                res.json(meals);
                res.end();
            });
        } else {
            res.status(403);
        }
    }
    function adminUpdate(req, res) {
        if (isAdmin(req.user)) {
            MealModelApi.updateMeal(req.params.id, req.body).then(meal => {
                res.json(meal);
            });
        } else {
            res.status(403);
        }
    }
    function adminRemove(req, res) {
        if (isAdmin(req.user)) {
            MealModelApi.deleteMealById(req.params.id).then(meal => {
                res.json(meal);
            });
        } else {
            res.status(403);
        }
    }



    function createMeal(req, res) {

        if (isAdmin(req.user)) {
            MealModelApi.createMeal(req.body).then(meal => {
                res.json(meal);
            });
            return;
        }

        if (req.isAuthenticated()) {
            let meal = req.body;
            meal.owner = req.user._id;
            MealModelApi.createMeal(meal).then(createdMeal => {
                res.json(createdMeal);
                res.end();
                meal.invited.forEach(cId => {
                    UserModelApi.getMongooseModel().update({_id: cId}, {$push: {meals: createdMeal._id}})
                });
            });
        } else {
            res.sendStatus(400);
        }
    }

    function updateMeal(req, res) {
        if (req.isAuthenticated()) {
            MealModelApi.findMealById(req.body._id).then(meal => {
                if (meal.owner == req.user._id || isAdmin(req.user)) {
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
                console.log(meal);
                console.log(req.user);
                if (" " + meal.owner == " " + req.user._id || isAdmin(req.user)) {
                    console.log("SHould be deleting.");
                    MealModelApi.deleteMealById(meal._id).then(() => {
                        res.status(200);
                        res.end();
                    });
                } else {
                    console.log("not equal???");
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
                    || meal.invited.includes(req.body._id)
                    || isAdmin(req.user)) {
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

    function getAllMeals(req, res) {
        if (isAdmin(req.user)) {
            MealModelApi.getAllMeals().then(data => {
                res.json(data);
            });
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        return user.roles.indexOf("ADMIN") > 0;
    }
};