'use strict';
module.exports = function() {
    require('./user/user.model.server');
    require('./meal/meal.model.server');
    require('./ingredient/ingredient.model.server');
    require('./recipe/recipe.model.server');
    require('./comment/comment.model.server');
}();