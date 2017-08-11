'use strict';
module.exports = function(app) {

    // TODO: Add meal recipe database integration

    let spoontacularApi = require("./spoontacular.service.server")(app);

    app.post("/api/project/searchForRecipe", searchForRecipe);
    app.post("/api/project/getRecipeInformation", getRecipeInformation);


    function searchForRecipe(req, res) {
        spoontacularApi.searchForRecipe(req, res);
    }

    function getRecipeInformation(req, res) {
        spoontacularApi.getRecipeInformation(req, res);
    }

};