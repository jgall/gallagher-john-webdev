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
            "adminCreate": adminCreate,
            "adminRead": adminRead,
            "adminUpdate": adminUpdate,
            "adminRemove": adminRemove,
        };

        return api;

        function createComment(comment) {
            return $http.put("/api/project/createMeal", comment).then(res => res.data);
        }

        function deleteComment(commentId) {
            return $http.delete("/api/project/deleteMeal", {_id: commentId}).then(res => res.data);
        }

        function adminCreate(body) {
            return $http.post('/api/project/user', body).then(res => res.data);
        }
        function adminRead() {
            return $http.get('/api/project/user').then(res => res.data);
        }
        function adminUpdate(user) {
            return $http.put('/api/project/user/' + user._id, user).then(res => res.data);
        }
        function adminRemove(id) {
            $http.delete('/api/project/user/' + id);
        }

    }

})();