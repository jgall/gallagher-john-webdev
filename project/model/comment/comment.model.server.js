'use strict';
module.exports = (function () {
    const mongoose = require("mongoose");
    const commentSchema = require("./comment.schema.server");
    const commentModel = mongoose.model("commentModel", commentSchema);

    const api = {
        "createComment": createComment,
        "deleteComment": deleteComment,
        "findCommentById": findCommentById,
    };

    return api;

    function createComment(comment) {
        return commentModel.create(comment);
    }

    function deleteComment(commentId) {
        return commentModel.remove({_id: commentId});
    }

    function findCommentById(commentId) {
        return commentModel.findById(commentId);
    }

})();