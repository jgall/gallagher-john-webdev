/**
 * Created by jggll on 7/17/17.
 */
'use strict';
(function () {
    angular.module("MealPlanner").factory("CommentService", CommentService);

    function CommentService($http) {
        let apiUrl = "/api/project";

        let api = {
            "createComment": createComment,
            "deleteComment": deleteComment,
        };

        return api;

        function createComment(comment) {
            return $http.put("/api/project/createMeal", comment).then(res => res.data);
        }

        function deleteComment(commentId) {
            return $http.delete("/api/project/deleteMeal", {_id: commentId}).then(res => res.data);
        }

    }

})();