'use strict';
module.exports = function(app) {

    let CommentModelApi = require("../model/comment/comment.model.server");

    app.put("/api/project/comment", createComment);
    app.delete("/api/project/deleteComment", deleteComment);

    function createComment(req, res) {
        if (req.isAuthenticated()) {
            let comment = req.body;
            comment.owner = req.user._id;
            CommentModelApi.createComment(comment);
        } else {
            res.sendStatus(400);
        }
    }

    function deleteComment(req, res) {
        if (req.isAuthenticated()) {
            CommentModelApi.findCommentById(req.body._id).then(comment => {
                if (comment.owner == req.user._id) {
                    return CommentModelApi.deleteComment(comment._id);
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
};