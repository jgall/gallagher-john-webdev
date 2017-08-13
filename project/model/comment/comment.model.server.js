'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const commentSchema = require("./comment.schema.server");
    const commentModel = mongoose.model("commentModel", commentSchema);

    let mealApi = false;

    const api = {
        "createComment": createComment,
        "deleteComment": deleteComment,
        "findCommentById": findCommentById,
    };

    return api;

    function createComment(comment) {
        return commentModel.create(comment).then(c => getMealApi().addComment(comment.mealId, c._id));
    }

    function deleteComment(commentId) {
        return commentModel.remove({_id: commentId});
    }

    function findCommentById(commentId) {
        return commentModel.findById(commentId);
    }

    function getMealApi() {
        if (!mealApi) {
            mealApi = require("../meal/meal.model.server");
        }
        return mealApi;
    }

})();