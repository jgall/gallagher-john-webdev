/**
 * Created by jggll on 7/17/17.
 */
(function() {
    let app = angular.module("POC",["ngRoute", "ngAnimate"]);

    app.controller("PocController", function($http) {
        const vm = this;

        vm.quickAnswerResponse = "";

        vm.quickAnswer = (query) => {
            $http.post("/api/poc/quickAnswer", {query}).then(res => vm.quickAnswerResponse = res.data);
        }
    })

})();