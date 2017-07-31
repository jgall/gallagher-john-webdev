/**
 * Created by jggll on 7/30/17.
 */
'use strict';
(function() {
    angular.module('WebAppMaker').factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        let api = {};

        return api;

        function searchPhotos(searchTerm) {
            let url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }

})();